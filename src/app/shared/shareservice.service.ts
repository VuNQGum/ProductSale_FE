import { filter, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ShareData {
	private subject = new Subject<any>();
	public storage: any;

	public dataShare: any;

	public eLoading: boolean = false;

	/**
	 * Các biến share của project managersystem
	 */
	eAuthenToken: any; // Lưu giá trị token
	eNavigation: any; // Lưu menu tương ứng với user

	/////////////////////////////////////

	/**
	 * Các biến share của project document
	 */

	/////////////////////////////////////

	/**
	 * Các biến share của project chat
	 */

	/////////////////////////////////////

	public constructor() {}

	// Kiểu truyền Event Bus
	sendMessage(key, value) {
		this.subject.next({
			key: key,
			value: value,
		});
	}
	getMessage(key): Observable<any> {
		return this.subject.pipe(
			filter((e) => e.key === key),
			map((e) => e['value']),
			// map((e) => {
			//     e["value"];
			//     console.log("Dữ liệu nhận từ Event Bus " + key + ": ", e["value"]);
			// })
		);

		// return this.subject.asObservable();
	}

	clearMessage() {
		this.subject = new Subject<any>();
	}

	// on(eventName: string, action: any): Subscription {
	//     return this.subject.pipe(
	//         filter((e) => e.name === eventName),
	//         map((e) => e["value"])).subscribe(action);
	// }
	/////////////////////////
}
