import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import {User} from 'models'
// import { RootState } from "reducers";

const AuthRoute:React.FC<{component:any, path:string }> = ({ component: Component, ...rest }) => {
  const user: User | null = useSelector((state: any) => state.user)
  return (
    <Route
      exact
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
