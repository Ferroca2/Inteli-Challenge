import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export default openai;
