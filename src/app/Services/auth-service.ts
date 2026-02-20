import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, map, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../Models/decoded-token";
import { User } from "../Models/user";
import { UserDetails } from "../Models/user-details";
import { Login } from "../Models/login";
import { inject } from "@angular/core";
import { ApiResponse } from "../Models/api-response";
import { Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private storageInstance: Storage | null = null;
  private apiUrl: string = 'http://localhost:8086/api';
  private tokenKey: string = "token";
  private userIdKey: string = "user_id";
  private roleKey: string = "role_user";

  private httpClient = inject(HttpClient);
  private storage = inject(Storage);

  constructor() {
  }

  login(data: Login): Observable<string>
  {
    return this.httpClient.post<ApiResponse<string>>(`${this.apiUrl}/users/login`, data).pipe(
      map((res) => {

        let token: string = "";

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data;
      }),
      catchError(this.handleError)
    );
  }

  private async getStorage(): Promise<Storage>
  {
    if (!this.storageInstance)
    {
      this.storageInstance = await this.storage.create();
    }

    return this.storageInstance;
  }

  async GetToken(): Promise<string | null>
  {
    const storage = await this.getStorage();
    return await storage.get(this.tokenKey);
  }

  async GetUserId(): Promise<string | null>
  {
    const storage = await this.getStorage();
    return await storage.get(this.userIdKey);
  }

  async UserRole(): Promise<string | null>
  {
    const storage = await this.getStorage();
    return await storage.get(this.roleKey);
  }

  async setStorage(token: string): Promise<any>
  {
    const storage = await this.getStorage();
    const tokenDecoded = jwtDecode<DecodedToken>(token);
    await storage.set(this.tokenKey, token);
    await storage.set(this.userIdKey, tokenDecoded.id);
    await storage.set(this.roleKey, tokenDecoded.rol);
  }

  GetUserById(id: number) : Observable<UserDetails>
  {
    return this.httpClient.get<ApiResponse<UserDetails>>(`${this.apiUrl}/users/userInfo/${id}`).pipe(
      map((res) => {

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data;
      }),
      catchError(this.handleError)
    )
  }

  UpdateUser(id: number, data: User) : Observable<User>
  {
    return this.httpClient.put<ApiResponse<User>>(`${this.apiUrl}/users/editUser/${id}`, data).pipe(
      map((res) => {

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data;
      }),
      catchError(this.handleError)
    )
  }

  async Logout(): Promise<void>
  {
    const storage = await this.getStorage();
    await storage.remove(this.tokenKey);
    await storage.remove(this.userIdKey);
    await storage.remove(this.roleKey);
  }

 async IsLoggedIn(): Promise<boolean>
  {
    const token = await this.GetToken();

    if (!token) return false;

    try
    {
      const decoded = jwtDecode<DecodedToken>(token);

      if (decoded && decoded.exp)
      {
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now)
        {
          await this.Logout();
          return false;
        }
      }
    }
    catch
    {
      return false;
    }

    return true;
  }

  private handleError(error: HttpErrorResponse)
  {
    let errorMsg = 'Error desconocido';

    if (error.error instanceof ErrorEvent)
    {
      errorMsg = `Error de cliente: ${error.error.message}`;
    }
    else if (!error.error)
    {
      errorMsg = error.message;
    }
    else
    {
      if (typeof error.error === 'string')
      {
        try
        {
          const parsed = JSON.parse(error.error);
          errorMsg = parsed.message;
        }
        catch
        {
          errorMsg = error.message;
        }
      }
    }

    return throwError(() => new Error(errorMsg));
  }
}
