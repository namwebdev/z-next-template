**Run this command to generate migrations folder (if it doesn't exist):**
```bash
npm run db:generate
```

**Run this command to migrate the database:**
```bash
npm run db:migrate
```

**If you want to see log of worker, remove this line at `worker/index.js`:**
```javascript
self.__WB_DISABLE_DEV_LOGS = true;
...
```

## Setup
1. Generate Web Push keys:
```bash
npx web-push generate-vapid-keys [--json]
```
2. Copy the keys just generated to `.env` file:
```env
NEXT_PUBLIC_VAPID_KEY=<Public Key>
VAPID_PRIVATE_KEY=<Private Key>
```

3. Define your table name in `DB_NAME` of `.env` file, and create the database in your PostgreSQL server.

4. Run this command to generate migrations folder:
```bash
npm run db:migrate
```

``Note: Make sure to enable notification permission in your browser before click send notification.``

### Todo:
- [ ] Complete information of notification.
- [ ] Request permission when click remove notification.
- [ ] Not receive notification when user in active tab.
