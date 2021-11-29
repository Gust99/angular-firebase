import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface Contact {
    nombre: string,
    apellido: string,
    email: string,
    id: string,
    mensaje: string
}

@Injectable()
export class DataService {

    contacs : Observable<Contact>;
    private contactsCollection : AngularFirestoreCollection<Contact>;

    constructor(private readonly afs: AngularFirestore) {
        this.contactsCollection = afs.collection<Contact>('contactos');
    }

    async onSaveContact(contactForm:Contact):Promise<void> {
        return new Promise(async(resolve,reject) => {
            try {
                const id = this.afs.createId();
                const data = {id, ...contactForm};
                const result = this.contactsCollection.doc(id).set(data);
                resolve(result);
            } catch (error) {
                reject(error.message);
            }
        });
    }

}