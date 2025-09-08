import React, {useState} from "react";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { saveUser } from "../services/userService";
import Message from "../components/Message";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserField, setUser } from "../store/userSlice";


const DashboardPage = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    // console.log("User state:", user);
    const handleChange = (field) => (value) => {
      dispatch(updateUserField({ field, value }));
    };
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

      if(!user.username || !password || !user.email || !user.role || !user.timezone){
          setMessage({type:"error", text:"Please fill in all fields."});
          return ; //stop execution if validations fails
      }

      setIsLoading(true);  //start loading

      try {
        const payload = {
            userName: user.username,
            userEmail: user.email,
            role: user.role,
            timezone: user.timezone,
            ...(password && { password }),//if exists
        };
        const result = await saveUser(payload); //call saveUser service
        // console.log(result);
        setMessage({type:"success", text:"User saved successfully!"});
      } catch (error) {
        setMessage({type:"error", text: "Error saving user"});
      }finally{
        setIsLoading(false)//stop loading 
        setPassword("");
      }
    };

return (
    <div className="container mt-4">
      <h2>Dashboard for {user.username}</h2>
      <Message type={message.type} text={message.text} />
      {isLoading && <p className="text-muted">Saving user data, please wait...</p>}
      <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            label="Username"
            value={user.username}
            onChange={handleChange("username")}
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
            value={user.email}
            onChange={handleChange("userEmail")}
            placeholder="Enter your email"
          />
          <SelectInput
            label="Role"
            value={user.role}
            onChange={handleChange("role")}
            options={user.available_roles}
          />
          <SelectInput
            label="Timezone"
            value={user.timezone}
            onChange={handleChange("timezone")}
            options={user.available_timezones}
          />
        </div>
      </div>
      <Button type="submit" label="Save" variant="primary" />
    </form>
    </div>
  );
};

export default DashboardPage;