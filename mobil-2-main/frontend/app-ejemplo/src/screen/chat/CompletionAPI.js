
import { useState } from 'react';

// Función de la API de completación
export const completionApi = async ({ prompt }) => {
  if (prompt === '') return;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages: [
          {
            role: 'user',
            content: prompt
          },
        ]
      })
    });

    const data = await response.json();
    const numTokens = data.usage?.total_tokens || 0;
    const message = data.choices[0]?.message?.content || 'No se pudo procesar la solicitud';

    return { numTokens, message };
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener la respuesta de la API');
  }
};


export function useCompletion() {
  const [prompt, setPrompt] = useState('');
  const [listMessage, setListMessage] = useState([]);

  const onSubmit = async () => {
    try {
      setListMessage((prevValues) => [
        ...prevValues,
        {
          id: prevValues.length,
          prompt: prompt,
          numTokens: 0,
          message: '',
          loading: true
        }
      ]);

      setPrompt('');

      const { message, numTokens } = await completionApi({ prompt });

      setListMessage((prevValues) =>
        prevValues.map((item) => {
          if (item.prompt === prompt) {
            return {
              ...item,
              numTokens: numTokens,
              message: message,
              loading: false
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error(error);
      
    }
  };

  const clearList = () => {
    setListMessage([]);
  };

  return { listMessage, prompt, setPrompt, clearList, onSubmit };
}

