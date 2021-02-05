import {Route, Redirect} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {User} from 'models'

const GuestRoute:React.FC<{component:any, path:string }> = ({ component: Component, ...rest }) => {
    const user: User | null = useSelector((state: any) => state.user)
    return (
      <Route
        {...rest}
        render={props =>
          !user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
};
export default GuestRoute;
