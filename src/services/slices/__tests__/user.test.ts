import { TRegisterData } from '@api';
import {
  authCheck,
  checkUserAuth,
  loginUser,
  logout,
  registerUser,
  TUserState,
  updateUser,
  userReducer
} from '@slices/userSlice';
import { RequestStatus, TUser } from '@utils-types';
const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle,
  error: null
};

const testUserData: TUser = {
  email: 'test@mail.ru',
  name: 'Test name'
};

const testRegisterUserData: TRegisterData = {
  email: 'test@mail.ru',
  name: 'Test name',
  password: 'TestPassWord'
};
describe('test users slice', () => {
  describe('test sync func', () => {
    it('should handle authCheck change the field "isAuthChecked" to true', () => {
      const newState = userReducer(initialState, authCheck());
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true
      });
    });

    it('should handle logout change the field "data" to null', () => {
      const state = {
        ...initialState,
        data: testUserData
      };
      const newState = userReducer(state, logout());
      expect(newState).toEqual(initialState);
    });
  });
  describe('test async func', () => {
    it('should set field requestStatus to "Loading" when checkUserAuth.pending', () => {
      const actualState = userReducer(initialState, checkUserAuth.pending(''));
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Loading'
      });
    });
    it('should set field requestStatus to "Success", field data to testUserData when checkUserAuth.fulfilled', () => {
      const actualState = userReducer(
        { ...initialState },
        checkUserAuth.fulfilled({ user: testUserData, success: true }, '')
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Success',
        data: testUserData
      });
    });
    it('should set field requestStatus to "Failed", field error to "Failed check auth user" when checkUserAuth.reject', () => {
      const actualState = userReducer(
        {
          ...initialState
        },

        checkUserAuth.rejected(new Error(), '')
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Failed',
        error: new Error('Failed check auth user')
      });
    });
    it('should set field requestStatus to "Loading" when registerUser.pending', () => {
      const actualState = userReducer(
        {
          ...initialState
        },

        registerUser.pending('', testRegisterUserData)
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Loading'
      });
    });
    it('should set field requestStatus to "Success", field data to testUserData when registerUser.fulfilled', () => {
      const actualState = userReducer(
        { ...initialState },
        registerUser.fulfilled(
          {
            user: testUserData,
            success: true,
            refreshToken: '123',
            accessToken: '456'
          },
          '',
          testRegisterUserData
        )
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Success',
        data: testUserData
      });
    });
    it('should set field requestStatus to "Failed", field error to "Failed registration" when registerUser.reject', () => {
      const actualState = userReducer(
        {
          ...initialState
        },

        registerUser.rejected(new Error(), '', testRegisterUserData)
      );

      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Failed',
        error: new Error('Failed registration')
      });
    });
    it('should set field requestStatus to "Loading" when loginUser.pending', () => {
      const actualState = userReducer(
        initialState,
        loginUser.pending('', testRegisterUserData)
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Loading'
      });
    });
    it('should set field requestStatus to "Success", field data to testUserData when loginUser.fulfilled', () => {
      const actualState = userReducer(
        { ...initialState },
        loginUser.fulfilled(
          {
            user: testUserData,
            success: true,
            refreshToken: '123',
            accessToken: '456'
          },
          '',
          testRegisterUserData
        )
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Success',
        data: testUserData
      });
    });
    it('should set field requestStatus to "Failed", field error to "Failed login" when loginUser.reject', () => {
      const actualState = userReducer(
        {
          ...initialState
        },

        loginUser.rejected(new Error(), '', testRegisterUserData)
      );

      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Failed',
        error: new Error('Failed login')
      });
    });
    it('should set field requestStatus to "Loading" when updateUser.pending', () => {
      const actualState = userReducer(
        {
          ...initialState
        },

        updateUser.pending('', testUserData)
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Loading'
      });
    });
    it('should set field requestStatus to "Success", field data to testUserData when updateUser.fulfilled', () => {
      const actualState = userReducer(
        {
          ...initialState
        },

        updateUser.fulfilled(
          { user: testUserData, success: true },
          '',
          testUserData
        )
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Success',
        data: testUserData
      });
    });
    it('should set field requestStatus to "Failed", field error to "Failed update user" when updateUser.reject', () => {
      const actualState = userReducer(
        {
          ...initialState
        },

        updateUser.rejected(new Error(), '', testUserData)
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: 'Failed',
        error: new Error('Failed update user')
      });
    });
  });
});
