import axios from 'axios';

export default function SendHeader() {
  const sendCustomHeader = async () => {
    try {
      const response = await axios.post('http://localhost:3001/post', {}, {
        headers: {
          'App-Type': 'settings',
        },
      });
      console.log('Received response from B App:', response.data);
    } catch (error) {
      console.error('Error sending custom header:', error);
    }
  };

  return (
    <div>
      <button onClick={sendCustomHeader}>Send Custom Header</button>
    </div>
  );
}
