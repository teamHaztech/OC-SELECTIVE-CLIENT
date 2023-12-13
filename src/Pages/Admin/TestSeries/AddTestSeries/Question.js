const axios = require('axios');

// Function to generate a question using GPT API
async function generateQuestion(prompt) {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 32, // Adjust the desired length of the generated question
      temperature: 0.7, // Adjust the temperature to control the randomness (0.0 to 1.0)
      n: 1, // Number of questions to generate
      stop: '\n' // Stop generation at the end of a line
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Replace with your OpenAI API key
      }
    });

    const question = response.data.choices[0].text.trim();
    return question;
  } catch (error) {
    console.error('Failed to generate question:', error);
    return null;
  }
}

// Usage example
const prompt = 'The capital city of France is';
generateQuestion(prompt)
  .then(question => {
    console.log('Generated Question:', question);
  })
  .catch(error => {
    console.error('Error:', error);
  });
