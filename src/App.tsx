@@ .. @@
 import { useCardioStore } from './store/useCardioStore';
 import { useStrengthStore } from './store/useStrengthStore';
 import { useSleepStore } from './store/useSleepStore';
 import { useStepsStore } from './store/useStepsStore';
+
+// Create a simple AISetupWelcome component since it's referenced but missing
+const AISetupWelcome: React.FC<{ onComplete: () => void; onSkip: () => void }> = ({ onComplete, onSkip }) => {
+  return (
+    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
+      <div className="max-w-md w-full text-center">
+        <div className="w-16 h-16 bg-[#F8B84E] rounded-2xl flex items-center justify-center mx-auto mb-4">
+          <Target className="w-8 h-8 text-white" />
+        </div>
+        <h2 className="text-2xl font-bold text-[#F3F4F6] mb-4">AI Assistant Setup</h2>
+        <p className="text-[#CBD5E1] mb-8">
+          Your AI fitness assistant is ready to help you achieve your goals with personalized recommendations and coaching.
+        </p>
+        <div className="space-y-3">
+          <button
+            onClick={onComplete}
+            className="w-full bg-[#F8B84E] hover:bg-[#F8B84E]/80 text-white font-semibold py-3 px-4 rounded-xl transition-all"
+          >
+            Enable AI Assistant
+          </button>
+          <button
+            onClick={onSkip}
+            className="w-full text-[#CBD5E1] font-medium py-3 px-4 rounded-xl hover:bg-[#161B22] transition-all"
+          >
+            Skip for now
+          </button>
+        </div>
+      </div>
+    </div>
+  );
+};

export default AISetupWelcome