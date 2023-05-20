// @ts-ignore
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public showLoader: boolean = false;
  user: any;
  token: any;

  constructor(private http: HttpClient) {
    // this.user=JSON.parse(localStorage.getItem('user'))
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };
  getCalculVariablebyMonth(month:number,year:number,type:number,user:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/paiements/calcul/${month}/${year}/${type}/${user}`)
  }
  getPaiementbyMonth(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/paiements/month/${id}`)
  }
  getPaiementByUser(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/paiements/user/${id}`)
  }
  getPresencebyDate(date:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/fichepresences/date/${date}`)
  }
  getPresencsByUser(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/fichepresences/user/${id}`)
  }
  getHeuresupplementaires() {
    return this.http.get<any>(`${environment.apiUrl}/v1/heuresupplementaires`)
  }
  getHeuresupplementaireByUser(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/heuresupplementaires/user/${id}`)
  }
  createHeureSuppl(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/heuresupplementaires`, data);
  }
  createPaiement(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/paiements`, data);
  }
  createFiche(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/fichepresences`, data);
  }
  createUser(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/users`, data);
  }
  getUserByEmail(email:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/users/email/${email}`)
  }
  getUserById(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/users/${id}`)
  }
  changePassword(id:number,oldpass:any,newpass:any) {
    return this.http.get<any>(`${environment.apiUrl}/v1/users/changepassword/${id}/${oldpass}/${newpass}`)
  }
  getPersonnels() {
    return this.http.get<any>(`${environment.apiUrl}/v1/personnels`)
  }
  getUsers() {
    return this.http.get<any>(`${environment.apiUrl}/v1/users`)
  }
  getDepartements() {
    return this.http.get<any>(`${environment.apiUrl}/v1/departements`)
  }
  getDepartementsByFoction(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/departements/fonction/${id}`)
  }
  createPersonnel(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/personnels`, data);
  }
  createDepartement(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/departements`, data);
  }
  getAvantages() {
    return this.http.get<any>(`${environment.apiUrl}/v1/avantages`)
  }
  getAvantagesByFoction(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/avantages/fonction/${id}`)
  }
  getPlageByDate(id:number,date:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/fichepresences/plage/${date}/${id}`)
  }
  getMyAbsences(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/absences/my/${id}`)
  }
  createAvantage(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/avantages`, data);
  }
  getTypeplaning() {
    return this.http.get<any>(`${environment.apiUrl}/v1/typeplanings`)
  }
  getAbsences() {
    return this.http.get<any>(`${environment.apiUrl}/v1/absences`)
  }
  createTypeplaning(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/typeplanings`, data);
  }
  getFonction() {
    return this.http.get<any>(`${environment.apiUrl}/v1/fonctions`)
  }
  getFonctionByDepartement(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/fonctions/departement/${id}`)
  }
  createFonction(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/fonctions`, data);
  }
  sendMail(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/users/sendmail`, data);
  }
  createFonctionDepartement(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/fonctions/adddepartement`, data);
  }
  createFonctionAvantage(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/fonctions/addavantage`, data);
  }
  removeFonctionAvantage(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/fonctions/removeavantage`, data);
  }
  removeFonctionDepartement(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/fonctions/removedepartement`, data);
  }
  getPlaningModels(date:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/planings/models/${date}`)
  }
  getPlaningModelMonths(date:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/planings/models/month/${date}`)
  }
  getPlaningAll() {
    return this.http.get<any>(`${environment.apiUrl}/v1/planings`)
  }
  getPlaningByUserID(id:number,date:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/planings/byuser/${id}/${date}`)
  }
  getPlaningByID(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/v1/planings/${id}`)
  }
  getPlaningHeaders(date:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/planings/headers/${date}`)
  }
  getPlaningHeaderMonths(date:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/planings/headers/month/${date}`)
  }
  createPlaning(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/planings`, data);
  }
  deleteTypeplaning(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/typeplanings/${id}`)
  }
  createAbsence(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/absences`, data);
  }
  deleteAbsence(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/absences/${id}`)
  }
  deleteFonction(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/fonctions/${id}`)
  }
  deletePlaningByID(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/planings/${id}`)
  }
  deleteDepartement(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/departements/${id}`)
  }
  deleteUser(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/users/${id}`)
  }
  deletePersonnels(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/personnels/${id}`)
  }
  deleteAvantage(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/avantages/${id}`)
  }
  deleteheureSuppl(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/v1/heuresupplementaires/${id}`)
  }
}
