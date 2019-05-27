import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => {
  console.log(props);
  return (
    <div>
      <h1>Info</h1>
      <p>This info is from {props.info}</p>
    </div>
  );
};

const withAdmiWarning = WrapperComponent => {
  return props => (
    <div>
      {props.isPrivate && <p>this is private info. Please don't share</p>}{' '}
      <WrapperComponent {...props} />
    </div>
  );
};

const AdminInfo = withAdmiWarning(Info);

const requireAuthentication = WrapperComponent => {
  return props => (
    <div>
      {props.isAuthenticated && <p>this is private info. Please don't share</p>}{' '}
      <WrapperComponent {...props} />
    </div>
  );
};

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(
//   <AdminInfo isPrivate={true} info="comes from props" />,
//   document.getElementById('app')
// );

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="comes from props" />,
  document.getElementById('app')
);
