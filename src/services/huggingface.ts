import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export const analyzeTweet = async (tweet: string) => {
  try {
    const result = await hf.textClassification({
      model: 'finiteautomata/bertweet-base-sentiment-analysis',
      inputs: tweet,
    });
    return result;
  } catch (error) {
    console.error('Error analyzing tweet:', error);
    throw new Error('Failed to analyze tweet sentiment');
  }
};

export const predictDisasterProbability = async (text: string) => {
  try {
    const result = await hf.textClassification({
      model: 'cardiffnlp/twitter-roberta-base-sentiment',
      inputs: text,
    });
    return {
      label: result[0].label,
      score: result[0].score,
      isDisaster: result[0].label === 'disaster'
    };
  } catch (error) {
    console.error('Error predicting disaster:', error);
    throw new Error('Failed to predict disaster probability');
  }
};