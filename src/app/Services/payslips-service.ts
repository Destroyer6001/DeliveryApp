import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, map, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ApiResponse} from "../Models/api-response";
import {AuthService} from "./auth-service";
import {PayslipDetails} from "../Models/payslip-details";
import {inject} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class PayslipsService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = 'http://localhost:8086/api';

  constructor() {}

  GetPaySlipsDetails(id:number):Observable<PayslipDetails[]>
  {
    return this.httpClient.get<ApiResponse<PayslipDetails[]>>(`${this.apiUrl}/payslips/getAllPayslipsUser/${id}`).pipe(
      map((res) => {

        if (!res.success)
        {
          throw new Error(res.message);
        }

        return res.data;

      }),
      catchError(this.handleError)
    );
  }

  GetPayslip(id:number):Observable<PayslipDetails>
  {
    return this.httpClient.get<ApiResponse<PayslipDetails>>(`${this.apiUrl}/payslips/getById/${id}`).pipe(
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

  CreatePayslip():Observable<number>
  {
    return this.httpClient.post<ApiResponse<number>>(`${this.apiUrl}/payslips`, null).pipe(
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

  private handleError(error: HttpErrorResponse)
  {
    let errorMsg = 'Error desconocido';

    if (error.error instanceof ErrorEvent)
    {
      errorMsg = `Error de cliente ${error.error.message}`;
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
