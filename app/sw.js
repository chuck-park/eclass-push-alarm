/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';

/*
*  푸시 메시지를 트리거할 때 브라우저는 푸시 메시지를 수신하고 푸
*  시의 대상이 되는 서비스 워커를 발견한 후 그 서비스 워커를 깨워 푸시 이벤트를 발송합니다. 
*  이 이벤트를 수신 대기하고 이벤트를 수신했을 때 그 결과로서 알림을 표시해야 합니다.
*/
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

  
/* 알림 클릭 처리 */
// 사용자가 알림을 클릭하면 notificationclick event listener가 호출됨.
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close(); // 클릭 된 알림을 닫음

  // event.waitUntil()을 호출하여 새 창이 표시되기 전에는 브라우저가
  // 서비스 워커를 종료하지 못하게 한다
  event.waitUntil(
    // 이 URL을 새 창으로 띄움
    clients.openWindow('http://chuckpark.kr')
  );
});
