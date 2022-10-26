import React from "react";
import UserList from "../components/UserList";

const Users=()=>{
    const USERS=[{
        id:'u1',
        name:'Bruce',
        places:'3',
        image:'https://cdn3.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png'
    }]
    return (
        <UserList items={USERS}/>
    );
};

export default Users;