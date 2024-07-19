import './App.css';
import { useState } from "react";
function App() {
  const [billValue, setBillValue] = useState("");
  const [serviceValue, setServiceValue] = useState(0);
  const [friendServiceValue, setFriendServiceValue] = useState(0);
  // console.log("billValue", billValue,);
  // console.log("serviceValue", serviceValue,);
  // console.log("friendServiceValue", friendServiceValue);
  return (
    <div>
      <BillInput billValue={billValue} onHandleBill={(val) => setBillValue(val)} />
      <SelectPersentage value={serviceValue} onChange={(val) => setServiceValue(val)}>How did you like the Service ?</SelectPersentage>
      <SelectPersentage value={friendServiceValue} onChange={(val) => setFriendServiceValue(val)}>How did you Friend like the Service ?</SelectPersentage>
      <OutPutSection billValue={billValue} serviceValue={serviceValue} friendServiceValue={friendServiceValue} />
      <ResetSection onReset={() => {
        setBillValue("");
        setServiceValue(0);
        setFriendServiceValue(0);
      }} />
    </div >
  );
}
function BillInput({ billValue, onHandleBill }) {
  return <div className='billSeaction'>
    <p>How much was the Bill ?</p>
    <input
      type="text"
      placeholder="Item..."
      value={billValue}
      onChange={(e) => {
        onHandleBill(e.target.value);
      }}
    ></input>
  </div>
}

function SelectPersentage({ value, onChange, onHandleBillService, children }) {

  return <div className='billSeaction'>
    <p>{children}</p>
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={0} key={0}>
        DisQualified ( 0 %)
      </option>
      <option value={5} key={5}>
        It was Okay ( 5 %)
      </option>
      <option value={10} key={10}>
        It was Good ( 10 %)
      </option>
      <option value={20} key={20}>
        Absolutely amazing ! ( 20 %)
      </option>
    </select>
  </div >
}

function OutPutSection({ billValue, serviceValue, friendServiceValue }) {
  const totalServie = ((Number(billValue)) * (((Number(serviceValue) + Number(friendServiceValue)) / 2))) / 100;
  const total = Number(billValue) + Number(totalServie);

  return billValue > 0 && <div>
    <p>You Pay ${total} (${Number(billValue)} + ${totalServie})</p>
  </div>

}

function ResetSection({ onReset }) {
  return <div>
    <button onClick={onReset}>Reset</button>
  </div>
}


export default App;
