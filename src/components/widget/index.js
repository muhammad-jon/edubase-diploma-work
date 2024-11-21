import React, { useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { Widget, addResponseMessage, deleteMessages, toggleInputDisabled } from 'react-chat-widget';
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default function ChatWidget() {
  const generateResponse = async newQuestion => {
    let options = {
      model: 'text-davinci-003',
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['/']
    };

    let completeOptions = {
      ...options,
      prompt: newQuestion
    };

    const response = await openai.createCompletion(completeOptions);

    console.log(response);
    const text = response.data.choices?.[0]?.text;
    return text;
  };
  const handleNewUserMessage = async m => {
    console.log(m);
    try {
      toggleInputDisabled();
      addResponseMessage('yozmoqda...', 'typing');
      const message = await generateResponse(m);
      deleteMessages(1, 'typing');
      if (message?.trim()) {
        addResponseMessage(message);
      }
      toggleInputDisabled();
    } catch (err) {
      toggleInputDisabled();
      deleteMessages(1, 'typing');
    }
  };

  useEffect(() => {
    deleteMessages(1, 'welcome');
    addResponseMessage('Assalomu alaykum! Qanday savolingiz bor?', 'welcome');
  }, []);

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Edu Base"
      launcherOpenImg={''}
      emojis
      subtitle="Sun'iy intellekt javob beradi"
    />
  );
}
