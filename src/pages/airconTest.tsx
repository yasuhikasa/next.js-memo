import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

type Token = {
  csrfToken: string;
};

const GetAirconProperties: NextPage<Token> = (props) => {
  const [result, setResult] = useState("");

  const fetchData = async () => {
    const requestBody = {
      request_type: "getAllAirconPropScope",
      source_module: "ApiServer",
      request_id: 1234567890,
    };

    try {
      const res = await axios.post("/api/v1/controllers/gw/airconProperties", requestBody, {
        headers: {
          "Content-Type": "application/json",
          "csrf-token": props.csrfToken,
        },
      });
      console.log(res.data);
      setResult(JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>あああ</button>
      {result && <pre>{result}</pre>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get("/api/v1/controllers/gw/token/getCsrfToken");
  const csrfToken = res.data.token;
  console.log("csrfToken", csrfToken);
  return {
    props: {
      csrfToken,
    },
  };
};

export default GetAirconProperties;


// const fetchData = async (csrfToken) => {
//   const requestBody = {
//     request_type: "getAllAirconPropScope",
//     source_module: "ApiServer",
//     request_id: 1234567890,
//   };

//   try {
//     const url = `/api/v1/controllers/gw/airconProperties?token=${encodeURIComponent(csrfToken)}`;
//     const response = await axios.post(url, requestBody);
//     console.log("Received data:", response.data);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };




// import React, { useState } from "react";
// import axios from "axios";
// import styles from "../getMainSetting/getMainSetting.module.scss";
// import { GetServerSideProps, NextPage } from "next";

// type Token = {
//   csrfToken: string;
// };

// const GetAirconProperties: NextPage<Token> = (props) => {
//   const [result, setResult] = useState("");
//   const [requestType, setRequestType] = useState("getAllAirconPropScope");
//   const [sourceModule, setSourceModule] = useState("ApiServer");
//   const [requestId, setRequestId] = useState(1234567890);

//   const fetchData = async () => {
//     const requestBody = {
//       request_type: requestType,
//       source_module: sourceModule,
//       request_id: requestId,
//     };

//     try {
//       const res = await axios.post("/api/v1/controllers/gw/airconProperties", requestBody, {
//         headers: {
//           "Content-Type": "application/json",
//           "csrf-token": props.csrfToken,
//         },
//       });
//       console.log(res.data);
//       setResult(JSON.stringify(res.data, null, 2));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         Request Type:
//         <input type="text" value={requestType} onChange={(e) => setRequestType(e.target.value)} />
//       </div>

//       <div>
//         Source Module:
//         <input type="text" value={sourceModule} onChange={(e) => setSourceModule(e.target.value)} />
//       </div>

//       <div>
//         Request ID:
//         <input type="number" value={requestId} onChange={(e) => setRequestId(Number(e.target.value))} />
//       </div>

//       <button onClick={fetchData}>あああ</button>

//       {result && <pre>{result}</pre>}
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await axios.get("/api/v1/controllers/gw/token/getCsrfToken");
//   const csrfToken = res.data.token;
//   console.log("csrfToken", csrfToken);
//   return {
//     props: {
//       csrfToken,
//     },
//   };
// };

// export default GetAirconProperties;
