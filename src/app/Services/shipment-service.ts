import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, map, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ApiResponse} from "../Models/api-response";
import {AuthService} from "./auth-service";
import {ShipmentsDetails} from "../Models/shipments-details";
import {inject} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8086/api';

  constructor() {}

  GetShipmentsUser(id: number): Observable<ShipmentsDetails[]>
  {
    return this.httpClient.get<ApiResponse<ShipmentsDetails[]>>(`${this.apiUrl}/shipments/getAll/${id}`).pipe(
      map((res) => {

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data;

      }),
      catchError(this.handlerError)
    )
  }

  CreateShipment(id: number): Observable<number>
  {
    return this.httpClient.post<ApiResponse<number>>(`${this.apiUrl}/shipments/${id}`, null).pipe(
      map((res) => {

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data;
      }),
      catchError(this.handlerError)
    )
  }

  CancelShipment(id: number): Observable<number>
  {
    return this.httpClient.put<ApiResponse<number>>(`${this.apiUrl}/shipments/cancel/${id}`, null).pipe(
      map((res) => {

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data;
      }),
      catchError(this.handlerError)
    )
  }

  ConfirmShipment(id: number): Observable<number>
  {
    return this.httpClient.put<ApiResponse<number>>(`${this.apiUrl}/shipments/confirm/${id}`, null).pipe(
      map((res) => {

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data;

      }),
      catchError(this.handlerError)
    )
  }

  private handlerError(error: HttpErrorResponse)
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
