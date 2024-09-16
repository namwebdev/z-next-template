## Setup Github OAuth 
1. Go to Github Developer Settings -> OAuth Apps -> New OAuth App
2. Authorization callback URL: ${NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback
3. Magic link template
```html
<h2>Magic Link</h2>

<p>Follow this link to login:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=magiclink">Log In</a></p>
```

## Generate Supabase Types
https://supabase.com/docs/guides/api/rest/generating-types
```bash
npx supabase gen types --lang=typescript --project-id "${SUPABASE_PROJ_ID}" --schema public > src/types/supabase.ts
```