import React, { useEffect, useState } from 'react';
import { AuthWrapper } from './components/auth/AuthWrapper';
import { useAppStore } from './store/useAppStore';
import { useWeightLossStore } from './store/useWeightLossStore';

// Onboarding Components
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { PhoneVerification } from './components/onboarding/PhoneVerification';
import { ProfileSetup } from './components/onboarding/ProfileSetup';
import { GoalSelection } from './components/onboarding/GoalSelection';
import { WeightLossSetup } from './components/weightLoss/WeightLossSetup';

// Main App Components
import { MainTabs } from './components/main/MainTabs';
import { TodayTab } from './components/main/TodayTab';
import { ProgressTab } from './components/main/ProgressTab';
import { PlanTab } from './components/main/PlanTab';
import { ProfileTab } from './components/main/ProfileTab';

// Types
import { GoalType, UserProfile, Goal } from './types';
import { WeightLossProfile } from './types/weightLoss';

// Simple AISetupWelcome component
const AISetupWelcome: React.FC<{ onComplete: () => void; onSkip: () => void }> = ({ onComplete, onSkip }) => {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#F8B84E] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🤖</span>
        </div>
        <h2 className="text-2xl font-bold text-[#F3F4F6] mb-4">AI Assistant Setup</h2>
        <p className="text-[#CBD5E1] mb-8">
          Your AI fitness assistant is ready to help you achieve your goals with personalized recommendations and coaching.
        </p>
        <div className="space-y-3">
          <button
            onClick={onComplete}
            className="w-full bg-[#F8B84E] hover:bg-[#F8B84E]/80 text-white font-semibold py-3 px-4 rounded-xl transition-all"
          >
            Enable AI Assistant
          </button>
          <button
            onClick={onSkip}
            className="w-full text-[#CBD5E1] font-medium py-3 px-4 rounded-xl hover:bg-[#161B22] transition-all"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const {
    currentScreen,
    currentTab,
    userProfile,
    goals,
    setCurrentScreen,
    setCurrentTab,
    setUserProfile,
    addGoal
  } = useAppStore();

  const {
    profile: weightLossProfile,
    setProfile: setWeightLossProfile
  } = useWeightLossStore();

  const handleGetStarted = () => {
    setCurrentScreen('phone');
  };

  const handlePhoneSkip = () => {
    setCurrentScreen('profile');
  };

  const handlePhoneVerified = (phone: string) => {
    setCurrentScreen('profile');
  };

  const handleProfileComplete = (profileData: any) => {
    const profile: UserProfile = {
      id: Date.now().toString(),
      weight: profileData.weight,
      weightUnit: profileData.weightUnit,
      height: profileData.height,
      heightUnit: profileData.heightUnit,
      age: profileData.age,
      gender: profileData.gender,
      selectedGoals: [],
      createdAt: new Date()
    };
    setUserProfile(profile);
    setCurrentScreen('goals');
  };

  const handleGoalsSelected = (selectedGoals: GoalType[]) => {
    const existingGoalTypes = goals.map(goal => goal.type);
    const newGoals = selectedGoals.filter(goalType => !existingGoalTypes.includes(goalType));
    
    if (newGoals.length === 0) {
      setCurrentScreen('main');
      return;
    }

    if (userProfile) {
      setUserProfile({
        ...userProfile,
        selectedGoals: [...userProfile.selectedGoals, ...newGoals]
      });
    }

    if (newGoals.includes('weight_loss')) {
      setCurrentScreen('goal-setup');
      return;
    }

    newGoals.forEach((goalType, index) => {
      const goalData = getGoalData(goalType);
      const goal: Goal = {
        id: `goal_${Date.now()}_${index}`,
        type: goalType,
        title: goalData.title,
        description: goalData.description,
        icon: goalData.icon,
        targetValue: goalData.defaultTarget,
        targetTimeframe: 12,
        currentValue: 0,
        isActive: true,
        createdAt: new Date()
      };
      
      addGoal(goal);
    });

    setCurrentScreen('main');
  };

  const handleWeightLossSetupComplete = (profile: WeightLossProfile) => {
    setWeightLossProfile(profile);
    
    const goal: Goal = {
      id: profile.goalId,
      type: 'weight_loss',
      title: 'Weight Loss',
      description: `Lose ${profile.currentWeight - profile.targetWeight}kg`,
      icon: 'target',
      targetValue: profile.targetWeight,
      targetTimeframe: 12,
      currentValue: profile.currentWeight,
      isActive: true,
      createdAt: new Date()
    };
    
    addGoal(goal);
    setCurrentScreen('main');
  };

  const getGoalData = (goalType: GoalType) => {
    const goalData = {
      weight_loss: {
        title: 'Weight Loss',
        description: 'Lose weight through calorie tracking and exercise',
        icon: 'target',
        defaultTarget: userProfile?.weightUnit === 'kg' ? 5 : 10
      },
      cardio_endurance: {
        title: 'Cardio Endurance',
        description: 'Build cardiovascular fitness',
        icon: 'heart',
        defaultTarget: 150
      },
      strength_building: {
        title: 'Strength Building',
        description: 'Increase muscle strength',
        icon: 'dumbbell',
        defaultTarget: 12
      },
      daily_steps: {
        title: 'Daily Steps',
        description: 'Stay active with daily step goals',
        icon: 'footprints',
        defaultTarget: 10000
      },
      workout_consistency: {
        title: 'Workout Consistency',
        description: 'Build exercise habits',
        icon: 'calendar',
        defaultTarget: 5
      },
      sleep_tracking: {
        title: 'Sleep Tracking',
        description: 'Improve sleep quality',
        icon: 'moon',
        defaultTarget: 8
      }
    };

    return goalData[goalType];
  };

  const renderGoalSetup = () => {
    const needsWeightLossSetup = userProfile?.selectedGoals.includes('weight_loss') && !weightLossProfile;
    if (needsWeightLossSetup) {
      return (
        <WeightLossSetup
          onComplete={handleWeightLossSetupComplete}
          userProfile={userProfile}
        />
      );
    }

    setCurrentScreen('main');
    return null;
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
      
      case 'phone':
        return (
          <PhoneVerification
            onSkip={handlePhoneSkip}
            onVerified={handlePhoneVerified}
          />
        );
      
      case 'profile':
        return <ProfileSetup onComplete={handleProfileComplete} />;
      
      case 'goals':
        return <GoalSelection onGoalsSelected={handleGoalsSelected} />;
      
      case 'goal-setup':
        return renderGoalSetup();
      
      case 'ai-setup':
        return (
          <AISetupWelcome 
            onComplete={() => setCurrentScreen('main')} 
            onSkip={() => setCurrentScreen('main')} 
          />
        );
      
      case 'main':
        return (
          <div className="min-h-screen bg-[#0D1117]">
            {renderMainContent()}
            <MainTabs activeTab={currentTab} onTabChange={setCurrentTab} />
          </div>
        );
      
      default:
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
    }
  };

  const renderMainContent = () => {
    switch (currentTab) {
      case 'today':
        return <TodayTab />;
      case 'progress':
        return <ProgressTab />;
      case 'plan':
        return <PlanTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <TodayTab />;
    }
  };

  return (
    <AuthWrapper>
      <div className="App">
        {renderCurrentScreen()}
      </div>
    </AuthWrapper>
  );
}

export default App;