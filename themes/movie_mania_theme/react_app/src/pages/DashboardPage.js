import React, {useState} from "react";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { saveUser } from "../services/userService";
import Message from "../components/Message";


const DashboardPage = ({ user}) => {
    const [userName, setUsername] = useState(user.username || "");
    const [password, setPassword] = useState("");
    const [userEmail, setEmail ] = useState(user.email || "");
    const [role, setRole] = useState(user.role || "");
    const [message, setMessage] = useState({type:"" , text: ""});

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { userName, password, role };
      const result = await saveUser(payload); //call saveUser service
      setMessage({type:"success", text:"User saved successfully!"});
    } catch (error) {
      setMessage({type:"error", text: "Error saving user"});
    }
  };

return (
    <div className="container mt-4">
      <h2>Dashboard for {userName}</h2>
      <Message type={message.type} text={message.text} />
      <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            label="Username"
            value={userName}
            onChange={setUsername}
            placeholder="Enter username"
          />
        </div>
        <div className="col-md-6">
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter password"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            label="Email"
            type="email"
            value={userEmail}
            onChange={setEmail}
            placeholder="Enter your email"
          />
        </div>
        <div className="col-md-6">
          <SelectInput
            label="Role"
            value={role}
            onChange={setRole}
            options={user.available_roles}
          />
        </div>
      </div>
      <Button type="submit" label="Save" variant="primary" />
    </form>
    </div>
  );
};

export default DashboardPage;