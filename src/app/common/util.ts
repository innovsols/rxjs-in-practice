import { Observable } from 'rxjs';

export function createHttpObservable(url: string) {
  return new Observable(observer => {
    // In order to explicitly cancel and unsubscribe observable AbortController is used and method is made to return abort
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error('Request Failed with Status Code : ' + response.status);
        }

      }).then(body => {
        observer.next(body);
        observer.complete();

      }).catch(err => {
        observer.error(err);
      });

    return () => controller.abort();
  });

}

