# crm
osef

## 🤖 AI Hub (`ai-hub.html`)

Interface mobile-first (un seul fichier HTML) pour utiliser Claude, GPT, Grok, Gemini et DeepSeek, avec deux rubriques : **Chat libre** et **Vinted** (annonce, prix, « Cop ou pas ? », mode lot, stock, stats).

### 🔐 Où sont mes clés API ?

- **Aucune clé n'est dans ce dépôt** (il est public). Le fichier ne contient ni clé, ni jeton, ni valeur par défaut.
- Tu saisis tes clés dans **⚙️ Paramètres**. Elles sont enregistrées **uniquement dans le `localStorage` de ton navigateur** (clés `aihub_key_<fournisseur>`), sur ton appareil.
- Elles sont envoyées **seulement à l'API du fournisseur concerné** (dans un en-tête HTTP, jamais dans l'URL). Elles n'apparaissent pas dans les exports JSON/CSV, les logs ni les messages d'erreur (masquées en `sk-…abcd`).
- **Chiffrement conseillé** : Paramètres → « Chiffrer mes clés » (AES-GCM + code). Toutes les pages servies depuis le même domaine GitHub Pages (`<ton-pseudo>.github.io`) partagent le même `localStorage` : le chiffrement protège tes clés si une autre de ces pages était compromise.
- « Effacer toutes mes clés » les supprime du navigateur. Pense aussi à fixer une limite de dépense chez chaque fournisseur.
- Une Content-Security-Policy stricte n'autorise les connexions qu'aux 5 API et à cdnjs. Tout contenu venant de l'IA passe par DOMPurify.

> Si tu modifies le `<script>` principal de `ai-hub.html`, recalcule son empreinte SHA-256 dans la balise CSP (la commande est en commentaire en haut du fichier). Sinon, le navigateur bloquera le script.
