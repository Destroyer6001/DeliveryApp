import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, map, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {OrderDetails} from "../Models/order-details";
import {ApiResponse} from "../Models/api-response";
import {inject} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private apiUrl: string = 'http://localhost:8086/api';
  private httpClient = inject(HttpClient);

  constructor() {}

  GetOrdersPendingDelivery(): Observable<OrderDetails[]>
  {
    return this.httpClient.get<ApiResponse<OrderDetails[]>>(`${this.apiUrl}/orders/ordersPending`).pipe(
      map((res) => {

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data

      }),
      catchError (this.handleError)
    );
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
