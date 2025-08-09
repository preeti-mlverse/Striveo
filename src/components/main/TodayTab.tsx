@@ .. @@
 import { StepsToday } from '../steps/StepsToday';
 import { LogEntry, GoalType } from '../../types';
 import { MealLog, WeightEntry } from '../../types/weightLoss';
 import { generateAIRecommendation, getMotivationalMessage } from '../../utils/aiRecommendations';
 import { FloatingAIAssistant } from '../common/FloatingAIAssistant';
 import { GoalSpecificAIAssistant } from '../common/GoalSpecificAIAssistant';
+
+// Create missing component placeholders
+const StrengthToday: React.FC<{ profile: any; onWorkoutLogged: (session: any) => void }> = ({ profile, onWorkoutLogged }) => {
+  return (
+    <div className="space-y-6">
+      <div className="bg-[#161B22] rounded-2xl p-6 border border-[#2B3440]">
+        <h3 className="text-lg font-semibold text-[#F3F4F6] mb-4">Strength Training</h3>
+        <p className="text-[#CBD5E1] mb-4">Complete your strength training setup to access this feature.</p>
+        <button className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 px-4 rounded-xl font-medium transition-colors">
+          Complete Setup
+        </button>
+      </div>
+    </div>
+  );
+};
+
+const SleepToday: React.FC<{ profile: any; onSleepLogged: (entry: any) => void }> = ({ profile, onSleepLogged }) => {
+  return (
+    <div className="space-y-6">
+      <div className="bg-[#161B22] rounded-2xl p-6 border border-[#2B3440]">
+        <h3 className="text-lg font-semibold text-[#F3F4F6] mb-4">Sleep Tracking</h3>
+        <p className="text-[#CBD5E1] mb-4">Complete your sleep tracking setup to access this feature.</p>
+        <button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 px-4 rounded-xl font-medium transition-colors">
+          Complete Setup
+        </button>
+      </div>
+    </div>
+  );
+};
+
+const StepsToday: React.FC<{ profile: any; onStepsLogged: (entry: any) => void }> = ({ profile, onStepsLogged }) => {
+  return (
+    <div className="space-y-6">
+      <div className="bg-[#161B22] rounded-2xl p-6 border border-[#2B3440]">
+        <h3 className="text-lg font-semibold text-[#F3F4F6] mb-4">Daily Steps</h3>
+        <p className="text-[#CBD5E1] mb-4">Complete your steps tracking setup to access this feature.</p>
+        <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-3 px-4 rounded-xl font-medium transition-colors">
+          Complete Setup
+        </button>
+      </div>
+    </div>
+  );
+};