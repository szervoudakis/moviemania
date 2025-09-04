import React, {useState} from "react";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { saveUser } from "../services/userService";
import Message from "../components/Message";
import { useEffect } from "react";


const DashboardPage = ({ user}) => {
    const [userName, setUsername] = useState(user.username || "");
    const [password, setPassword] = useState("");
    const [userEmail, setEmail ] = useState(user.email || "");
    const [role, setRole] = useState(user.role || "");
    const [message, setMessage] = useState({type:"" , text: ""});
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
      if (message.text) {
        const timer = setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 3000);  //3 seconds for the message

        return () => clearTimeout(timer); //clear timeout if message changed
      }
    }, [message]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!userName || !password || !userEmail || !role){
          setMessage({type:"error", text:"Please fill in all fields."});
          return ; //stop execution if validations fails
      }

      setIsLoading(true);  //start loading

      try {
        const payload = { userName, password, userEmail, role };
        const result = await saveUser(payload); //call saveUser service
        setMessage({type:"success", text:"User saved successfully!"});
      } catch (error) {
        setMessage({type:"error", text: "Error saving user"});
      }finally{
        setIsLoading(false)//stop loading
      }
    };

return (
    <div className="container mt-4">
      <h2>Dashboard for {userName}</h2>
      <Message type={message.type} text={message.text} />
      {isLoading && <p className="text-muted">Saving user data, please wait...</p>}
      <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            label="Username"
            value={userName}
            onChange={setUsername}
            placeholder="Enter username"
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter password"
          />
          <TextInput
            label="Email"
            type="email"
            value={userEmail}
            onChange={setEmail}
            placeholder="Enter your email"
          />
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