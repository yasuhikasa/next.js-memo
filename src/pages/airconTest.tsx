import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [requestType, setRequestType] = useState<string>('getAllAirconPropScope');
  const [sourceModule, setSourceModule] = useState<string>('ApiServer');
  const [requestId, setRequestId] = useState<number>(1234567890);
  const [responseData, setResponseData] = useState<any>(null); // レスポンスデータを保存するステート

  const fetchData = async () => {
    const requestBody = {
      request_type: requestType,
      source_module: sourceModule,
      request_id: requestId
    };

    try {
      const res = await axios.post('/api/airConditioner/properties/def', requestBody);
      console.log(res.data);
      setResponseData(res.data); // レスポンスデータをステートに保存
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <label>
          Request Type:
          <input type="text" value={requestType} onChange={(e) => setRequestType(e.target.value)} />
        </label>
        <label>
          Source Module:
          <input type="text" value={sourceModule} onChange={(e) => setSourceModule(e.target.value)} />
        </label>
        <label>
          Request ID:
          <input type="number" value={requestId} onChange={(e) => setRequestId(Number(e.target.value))} />
        </label>
      </form>
      <button onClick={fetchData}>Fetch Aircon Data</button>
      {/* レスポンスデータの表示 */}
      {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
    </div>
  );
}

export default Home;
