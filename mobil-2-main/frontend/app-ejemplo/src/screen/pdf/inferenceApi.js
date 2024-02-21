export const inferenceApi = async ({ data }) => {
  try {
    const formData = new FormData();
    formData.append('pdf', data.pdf);
    formData.append('question', data.question);

    const response = await fetch(`http://localhost:3000/inference`, {
      method: 'POST',
      body: formData
    });

    const json = await response.json();
    console.log(json);
    return json; 
  } catch (error) {
    console.log('Error al obtener la respuesta de la API de inferencia');
  }
};  
 