/* eslint-disable no-undef */
/* eslint-disable camelcase */
import puppeteer, { Page } from 'puppeteer';
import { performance } from 'node:perf_hooks';
import openai from './openai';

/**
 * @param {import('puppeteer').Page} page
 */

declare function $$processLinks(options: (string | null)[]): string[];

async function getLinks(page: Page) {
    let resolve: (value: unknown) => void;

    const promise = new Promise(r => resolve = r);

    await page.exposeFunction('$$processLinks', (links: (string | null)[]) => {
        resolve(links);
    });

    await page.evaluate(async () => {
        const root = document.querySelector('[data-test-id="virtuoso-scroller"]');

        const scroll = () => {
            const originalScroll = root!.scrollTop;
            const availableScroll = root!.scrollHeight - root!.clientHeight - root!.scrollTop;

            root!.scrollBy(0, Math.min(root!.clientHeight, availableScroll));

            // eslint-disable-next-line eqeqeq
            if (originalScroll == root!.scrollTop) {
                $$processLinks(links);
            }
            else {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);

        function getLinkFromBox(element: Element | null) {
            if (
                !element ||
                element.querySelector('img')?.src !== 'https://news.treeofalpha.com/static/images/medium.png'
            ) {
                return null;
            }

            return element.querySelector('a')?.href ?? null;
        }

        const links = Array
            .from(root!.querySelectorAll('.box'))
            .map(getLinkFromBox)
            .filter(Boolean);

        const observer = new MutationObserver(mutationsList => {
            for (const mutation of mutationsList) {
                if (!mutation.addedNodes.length) continue;

                const nodes = Array.from(mutation.addedNodes) as HTMLElement[];

                for (const node of nodes) {
                    const element = node.querySelector('.box');

                    const href = getLinkFromBox(element);

                    if (href) {
                        links.push(href);

                    }
                }
            }
        });

        observer.observe(
            root!,
            {
                childList: true,
                subtree: true,
            }
        );
    });

    return promise as Promise<string[]>;
}


export async function getNews () {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto('https://news.treeofalpha.com/', {
        waitUntil: 'networkidle0',
    });

    console.log('Page loaded');

    const begin = performance.now();
    const links = await getLinks(page);
    const time = performance.now() - begin;

    console.log(`Found ${links.length} links in ${time} ms`);
    for (const link of links) {
        console.log(link);
    }

    page.close();

    page.close();

    const texts = await Promise.all(links.map(async link => {
        const resume =  await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Resuma a notícia presente no seguinte site colocando uma headline e o resumo\n${link} dando um output no formato json seguinte: {"headline": "string", "resume": "string"} não se esqueça de colocar as aspas duplas no json e sem colocar ponto final no começo das frases`,
            temperature: 0.7,
            max_tokens: 1000,
        });
        let formatted: string;

        if(resume.data.choices[0]!.text![0] === '.') {
            formatted = resume.data.choices[0]!.text!.slice(1).replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');
        } else {
            formatted = resume.data.choices[0]!.text!.replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');
        }

        return JSON.parse(formatted);
    }));

    return texts;
}
