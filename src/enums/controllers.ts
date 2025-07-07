export enum EUserActions {
  GetAll = 'getAllUsers',
  Get = 'getUser',
  Add = 'registerUser',
  Update = 'updateUser',
}

export enum EKeyActions {
  GetAll = 'getAllKeys',
  Add = 'addKey',
  Remove = 'removeKey',
}

export enum EClientActions {
  Get = 'getKeys',
  Add = 'addKey',
  Remove = 'removeKey',
}

export enum EHealthActions {
  Get = 'getHealth',
}

export enum EAuthActions {
  GetLogin = 'getLogin',
  PostLogin = 'postLogin',
  CancelLogin = 'cancelLogin',
}

export enum ERoleActions {
  Get = 'getRole',
  GetAll = 'getAllRoles',
}

export enum EControllers {
  Users = 'users',
  Keys = 'keys',
  Health = 'health',
  Auth = 'auth',
  Clients = 'clients',
  Roles = 'roles',
}
