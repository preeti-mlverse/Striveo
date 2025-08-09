@@ .. @@
 import { StrictMode } from 'react';
 import { createRoot } from 'react-dom/client';
+import { AuthWrapper } from './components/auth/AuthWrapper';
 import App from './App.tsx';
 import './index.css';
 
 createRoot(document.getElementById('root')!).render(
   <StrictMode>
-    <App />
+    <AuthWrapper>
+      <App />
+    </AuthWrapper>
   </StrictMode>
 );