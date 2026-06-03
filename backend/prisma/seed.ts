import { PrismaClient, MuscleGroup, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

const exercises = [
  // CHEST
  {
    name: 'Bench Press',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Lie on a flat bench with your feet flat on the floor.',
      'Grip the barbell with hands slightly wider than shoulder-width.',
      'Lower the bar to your mid-chest.',
      'Push the bar back up until your arms are fully extended.'
    ]),
    commonMistakes: JSON.stringify(['Bouncing the bar off the chest', 'Arching the back excessively']),
    setsRecommendation: '3-4',
    repsRecommendation: '8-12',
    targetMuscle: 'Pectoralis Major'
  },
  {
    name: 'Dumbbell Flyes',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Dumbbells',
    instructions: JSON.stringify([
      'Lie on a flat bench holding dumbbells above your chest with palms facing each other.',
      'Lower the weights in a wide arc until you feel a stretch in your chest.',
      'Bring the weights back together using the same arc.'
    ]),
    commonMistakes: JSON.stringify(['Bending elbows too much', 'Lowering weights too fast']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Pectoralis Major'
  },
  {
    name: 'Incline Bench Press',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Sit on an incline bench set to 30-45 degrees.',
      'Lower the barbell to your upper chest.',
      'Press the bar straight up.'
    ]),
    commonMistakes: JSON.stringify(['Incorrect bench angle', 'Uneven grip']),
    setsRecommendation: '3-4',
    repsRecommendation: '8-10',
    targetMuscle: 'Upper Pectorals'
  },
  {
    name: 'Push-ups',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Bodyweight',
    instructions: JSON.stringify([
      'Start in a plank position with hands slightly wider than shoulders.',
      'Lower your body until your chest nearly touches the floor.',
      'Push back up to the starting position.'
    ]),
    commonMistakes: JSON.stringify(['Sagging hips', 'Flaring elbows out']),
    setsRecommendation: '3',
    repsRecommendation: 'AMRAP (As Many Reps As Possible)',
    targetMuscle: 'Chest, Triceps'
  },
  {
    name: 'Cable Crossover',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Cable Machine',
    instructions: JSON.stringify([
      'Stand between two cable pulleys.',
      'Bring the handles together in front of your body with a slight bend in your elbows.',
      'Slowly return to the start position.'
    ]),
    commonMistakes: JSON.stringify(['Using too much weight', 'Losing control of the movement']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Lower Pectorals'
  },
  {
    name: 'Dips',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Parallel Bars',
    instructions: JSON.stringify([
      'Suspend yourself on parallel bars.',
      'Lean slightly forward and lower your body until your shoulders are below your elbows.',
      'Push back up to the top.'
    ]),
    commonMistakes: JSON.stringify(['Staying too upright (targets triceps more)', 'Locking elbows too hard']),
    setsRecommendation: '3',
    repsRecommendation: '8-12',
    targetMuscle: 'Lower Chest'
  },
  {
    name: 'Pec Deck Fly',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Machine',
    instructions: JSON.stringify([
      'Sit in the pec deck machine.',
      'Grip the handles and bring them together in front of your chest.',
      'Slowly return to the starting position.'
    ]),
    commonMistakes: JSON.stringify(['Letting the weights touch', 'Moving too fast']),
    setsRecommendation: '3',
    repsRecommendation: '10-15',
    targetMuscle: 'Pectoralis Major'
  },
  {
    name: 'Landmine Press',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Barbell/Landmine',
    instructions: JSON.stringify([
      'Hold the end of a landmine barbell at shoulder height.',
      'Press the bar forward and upward.',
      'Slowly lower back down.'
    ]),
    commonMistakes: JSON.stringify(['Leaning back', 'Using legs to drive']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Upper Chest'
  },
  {
    name: 'Chest Press Machine',
    muscleGroup: MuscleGroup.CHEST,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Machine',
    instructions: JSON.stringify([
      'Sit and adjust the seat so the handles are at chest height.',
      'Push the handles forward until arms are extended.',
      'Slowly return.'
    ]),
    commonMistakes: JSON.stringify(['Not using full range of motion']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Chest'
  },

  // BACK
  {
    name: 'Pull-ups',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Pull-up Bar',
    instructions: JSON.stringify([
      'Grip the bar with palms facing away.',
      'Pull your chest up toward the bar.',
      'Lower yourself back down with control.'
    ]),
    commonMistakes: JSON.stringify(['Kicking legs', 'Not going all the way down']),
    setsRecommendation: '3',
    repsRecommendation: '5-12',
    targetMuscle: 'Latissimus Dorsi'
  },
  {
    name: 'Bent Over Row',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Bend at the hips with your back flat.',
      'Pull the barbell toward your lower ribs.',
      'Lower the bar back to the start.'
    ]),
    commonMistakes: JSON.stringify(['Rounding the back', 'Using momentum']),
    setsRecommendation: '3-4',
    repsRecommendation: '8-12',
    targetMuscle: 'Rhomboids, Lats'
  },
  {
    name: 'Lat Pulldown',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Cable Machine',
    instructions: JSON.stringify([
      'Sit and grip the wide bar.',
      'Pull the bar down toward your upper chest.',
      'Slowly return to the start.'
    ]),
    commonMistakes: JSON.stringify(['Pulling behind the neck', 'Leaning back too far']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Latissimus Dorsi'
  },
  {
    name: 'Seated Cable Row',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Cable Machine',
    instructions: JSON.stringify([
      'Sit and place feet on the pads.',
      'Pull the handle toward your abdomen while keeping your back straight.',
      'Release slowly.'
    ]),
    commonMistakes: JSON.stringify(['Rocking the torso']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Middle Back'
  },
  {
    name: 'Deadlift',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.ADVANCED,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Stand with feet hip-width apart.',
      'Hinge at hips and grip the bar.',
      'Lift the bar by extending hips and knees.',
      'Lower back down with a flat back.'
    ]),
    commonMistakes: JSON.stringify(['Rounding the spine', 'Bar too far from shins']),
    setsRecommendation: '3-5',
    repsRecommendation: '3-8',
    targetMuscle: 'Erector Spinae, Glutes, Hamstrings'
  },
  {
    name: 'Single Arm Dumbbell Row',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbell',
    instructions: JSON.stringify([
      'Support one hand and knee on a bench.',
      'Pull the dumbbell toward your hip.',
      'Lower back down.'
    ]),
    commonMistakes: JSON.stringify(['Rotating the torso too much']),
    setsRecommendation: '3',
    repsRecommendation: '10-12 per arm',
    targetMuscle: 'Lats'
  },
  {
    name: 'T-Bar Row',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'T-Bar/Landmine',
    instructions: JSON.stringify([
      'Stand over the bar with a wide or narrow grip.',
      'Pull the bar to your chest.',
      'Lower with control.'
    ]),
    commonMistakes: JSON.stringify(['Not keeping chest up']),
    setsRecommendation: '3',
    repsRecommendation: '8-12',
    targetMuscle: 'Middle Back'
  },
  {
    name: 'Face Pulls',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Cable Machine',
    instructions: JSON.stringify([
      'Pull the rope toward your face, pulling the ends apart.',
      'Squeeze your shoulder blades together.',
      'Return slowly.'
    ]),
    commonMistakes: JSON.stringify(['Using too much weight', 'Pulling too low']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Rear Delts, Upper Back'
  },
  {
    name: 'Hyperextensions',
    muscleGroup: MuscleGroup.BACK,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Bench',
    instructions: JSON.stringify([
      'Lie face down on a hyperextension bench.',
      'Bend at the waist and lower your torso.',
      'Raise your torso until your body is in a straight line.'
    ]),
    commonMistakes: JSON.stringify(['Overextending the back']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Lower Back'
  },

  // SHOULDERS
  {
    name: 'Overhead Press',
    muscleGroup: MuscleGroup.SHOULDERS,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Stand with feet shoulder-width apart.',
      'Press the barbell from your upper chest to above your head.',
      'Lower back to chest height.'
    ]),
    commonMistakes: JSON.stringify(['Using legs to press (that is a push press)', 'Arching lower back']),
    setsRecommendation: '3-4',
    repsRecommendation: '8-10',
    targetMuscle: 'Anterior Deltoids'
  },
  {
    name: 'Lateral Raises',
    muscleGroup: MuscleGroup.SHOULDERS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells',
    instructions: JSON.stringify([
      'Hold dumbbells at your sides.',
      'Raise arms out to the sides until they are level with shoulders.',
      'Lower slowly.'
    ]),
    commonMistakes: JSON.stringify(['Swinging weights', 'Raising above shoulder height']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Lateral Deltoids'
  },
  {
    name: 'Arnold Press',
    muscleGroup: MuscleGroup.SHOULDERS,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Dumbbells',
    instructions: JSON.stringify([
      'Start with dumbbells in front of shoulders, palms facing you.',
      'Rotate palms outward as you press the weights overhead.',
      'Reverse the movement on the way down.'
    ]),
    commonMistakes: JSON.stringify(['Incomplete rotation']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Entire Shoulder'
  },
  {
    name: 'Front Raises',
    muscleGroup: MuscleGroup.SHOULDERS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells',
    instructions: JSON.stringify([
      'Raise dumbbells straight in front of you to shoulder height.',
      'Lower slowly.'
    ]),
    commonMistakes: JSON.stringify(['Using momentum']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Anterior Deltoid'
  },
  {
    name: 'Reverse Flyes',
    muscleGroup: MuscleGroup.SHOULDERS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells/Machine',
    instructions: JSON.stringify([
      'Lean forward or sit on a machine.',
      'Bring your arms back and out, squeezing shoulder blades.',
      'Return slowly.'
    ]),
    commonMistakes: JSON.stringify(['Using traps too much']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Rear Deltoid'
  },
  {
    name: 'Upright Row',
    muscleGroup: MuscleGroup.SHOULDERS,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Barbell/EZ Bar',
    instructions: JSON.stringify([
      'Pull the bar up toward your chin, elbows leading.',
      'Lower slowly.'
    ]),
    commonMistakes: JSON.stringify(['Pulling too high (wrist pain)', 'Jerking the weight']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Side Delts, Traps'
  },
  {
    name: 'Shrugs',
    muscleGroup: MuscleGroup.SHOULDERS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells/Barbell',
    instructions: JSON.stringify([
      'Hold weights and lift your shoulders toward your ears.',
      'Squeeze and lower.'
    ]),
    commonMistakes: JSON.stringify(['Rolling shoulders']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Trapezius'
  },
  {
    name: 'Dumbbell Shoulder Press',
    muscleGroup: MuscleGroup.SHOULDERS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells',
    instructions: JSON.stringify([
      'Sit or stand, press dumbbells from shoulder level to overhead.'
    ]),
    commonMistakes: JSON.stringify(['Weights clashing at the top']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Shoulders'
  },

  // ARMS
  {
    name: 'Bicep Curls',
    muscleGroup: MuscleGroup.ARMS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells',
    instructions: JSON.stringify([
      'Hold dumbbells with palms forward.',
      'Curl the weights toward your shoulders.',
      'Lower slowly.'
    ]),
    commonMistakes: JSON.stringify(['Swinging elbows']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Biceps Brachii'
  },
  {
    name: 'Hammer Curls',
    muscleGroup: MuscleGroup.ARMS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells',
    instructions: JSON.stringify([
      'Hold dumbbells with palms facing each other.',
      'Curl towards shoulders.'
    ]),
    commonMistakes: JSON.stringify(['Partial reps']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Brachialis'
  },
  {
    name: 'Tricep Pushdowns',
    muscleGroup: MuscleGroup.ARMS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Cable Machine',
    instructions: JSON.stringify([
      'Push the cable handle down until arms are straight.',
      'Slowly return.'
    ]),
    commonMistakes: JSON.stringify(['Elbows moving away from ribs']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Triceps Brachii'
  },
  {
    name: 'Skull Crushers',
    muscleGroup: MuscleGroup.ARMS,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'EZ Bar',
    instructions: JSON.stringify([
      'Lie on a bench, lower the bar toward your forehead.',
      'Extend arms back to start.'
    ]),
    commonMistakes: JSON.stringify(['Flaring elbows']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Triceps'
  },
  {
    name: 'Preacher Curls',
    muscleGroup: MuscleGroup.ARMS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Preacher Bench',
    instructions: JSON.stringify([
      'Sit at the bench, curl the bar while arms are supported.'
    ]),
    commonMistakes: JSON.stringify(['Not extending fully at the bottom']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Biceps'
  },
  {
    name: 'Overhead Tricep Extension',
    muscleGroup: MuscleGroup.ARMS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbell',
    instructions: JSON.stringify([
      'Hold a dumbbell overhead with both hands.',
      'Lower behind head, then extend.'
    ]),
    commonMistakes: JSON.stringify(['Hitting the head']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Triceps'
  },
  {
    name: 'Concentration Curls',
    muscleGroup: MuscleGroup.ARMS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbell',
    instructions: JSON.stringify([
      'Sit, rest elbow on inner thigh, curl dumbbell.'
    ]),
    commonMistakes: JSON.stringify(['Using leg to help']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Biceps'
  },
  {
    name: 'Close Grip Bench Press',
    muscleGroup: MuscleGroup.ARMS,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Bench press with hands close together.'
    ]),
    commonMistakes: JSON.stringify(['Hands too close (wrist pain)']),
    setsRecommendation: '3',
    repsRecommendation: '8-12',
    targetMuscle: 'Triceps'
  },

  // LEGS
  {
    name: 'Squats',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Barbell on upper back.',
      'Lower hips until thighs are parallel to floor.',
      'Drive back up.'
    ]),
    commonMistakes: JSON.stringify(['Knees caving in', 'Heels lifting']),
    setsRecommendation: '3-4',
    repsRecommendation: '8-12',
    targetMuscle: 'Quadriceps, Glutes'
  },
  {
    name: 'Leg Press',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Machine',
    instructions: JSON.stringify([
      'Push the platform away with legs.',
      'Lower slowly.'
    ]),
    commonMistakes: JSON.stringify(['Locking knees at the top']),
    setsRecommendation: '3',
    repsRecommendation: '10-15',
    targetMuscle: 'Quads'
  },
  {
    name: 'Lunges',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells',
    instructions: JSON.stringify([
      'Step forward and lower back knee toward the floor.',
      'Push back to start.'
    ]),
    commonMistakes: JSON.stringify(['Step too short']),
    setsRecommendation: '3',
    repsRecommendation: '10 per leg',
    targetMuscle: 'Quads, Glutes'
  },
  {
    name: 'Romanian Deadlift',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Hinge at hips, lowering bar along shins while keeping legs relatively straight.',
      'Feel stretch in hamstrings and return.'
    ]),
    commonMistakes: JSON.stringify(['Rounding back']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Hamstrings'
  },
  {
    name: 'Leg Extensions',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Machine',
    instructions: JSON.stringify([
      'Extend legs straight in the machine.'
    ]),
    commonMistakes: JSON.stringify(['Jerking weight']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Quadriceps'
  },
  {
    name: 'Leg Curls',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Machine',
    instructions: JSON.stringify([
      'Curl legs toward glutes.'
    ]),
    commonMistakes: JSON.stringify(['Lifting hips off pad']),
    setsRecommendation: '3',
    repsRecommendation: '12-15',
    targetMuscle: 'Hamstrings'
  },
  {
    name: 'Calf Raises',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells/Machine',
    instructions: JSON.stringify([
      'Rise up on the balls of your feet.'
    ]),
    commonMistakes: JSON.stringify(['Not using full range']),
    setsRecommendation: '3',
    repsRecommendation: '15-20',
    targetMuscle: 'Gastrocnemius'
  },
  {
    name: 'Bulgarian Split Squats',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Dumbbells + Bench',
    instructions: JSON.stringify([
      'One foot elevated on a bench behind you, squat with the other leg.'
    ]),
    commonMistakes: JSON.stringify(['Losing balance']),
    setsRecommendation: '3',
    repsRecommendation: '8-12 per leg',
    targetMuscle: 'Quads, Glutes'
  },
  {
    name: 'Glute Bridges',
    muscleGroup: MuscleGroup.LEGS,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Bodyweight/Barbell',
    instructions: JSON.stringify([
      'Lie on back, lift hips toward ceiling.'
    ]),
    commonMistakes: JSON.stringify(['Overarching back']),
    setsRecommendation: '3',
    repsRecommendation: '15-20',
    targetMuscle: 'Gluteus Maximus'
  },

  // CORE
  {
    name: 'Plank',
    muscleGroup: MuscleGroup.CORE,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Bodyweight',
    instructions: JSON.stringify([
      'Hold a push-up position on your elbows.'
    ]),
    commonMistakes: JSON.stringify(['Hips too high or low']),
    setsRecommendation: '3',
    repsRecommendation: '30-60 seconds',
    targetMuscle: 'Rectus Abdominis'
  },
  {
    name: 'Russian Twists',
    muscleGroup: MuscleGroup.CORE,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Bodyweight/Weight',
    instructions: JSON.stringify([
      'Sit, lean back, and rotate your torso side to side.'
    ]),
    commonMistakes: JSON.stringify(['Moving only arms']),
    setsRecommendation: '3',
    repsRecommendation: '20 total',
    targetMuscle: 'Obliques'
  },
  {
    name: 'Hanging Leg Raises',
    muscleGroup: MuscleGroup.CORE,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Pull-up Bar',
    instructions: JSON.stringify([
      'Hang from bar, lift legs to 90 degrees.'
    ]),
    commonMistakes: JSON.stringify(['Swinging body']),
    setsRecommendation: '3',
    repsRecommendation: '10-15',
    targetMuscle: 'Lower Abs'
  },
  {
    name: 'Ab Wheel Rollout',
    muscleGroup: MuscleGroup.CORE,
    difficulty: Difficulty.ADVANCED,
    equipment: 'Ab Wheel',
    instructions: JSON.stringify([
      'Roll out on the wheel and pull back.'
    ]),
    commonMistakes: JSON.stringify(['Arching back']),
    setsRecommendation: '3',
    repsRecommendation: '8-12',
    targetMuscle: 'Abs'
  },
  {
    name: 'Cable Crunches',
    muscleGroup: MuscleGroup.CORE,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Cable Machine',
    instructions: JSON.stringify([
      'Kneel and pull cable down using abs.'
    ]),
    commonMistakes: JSON.stringify(['Using arms to pull']),
    setsRecommendation: '3',
    repsRecommendation: '15-20',
    targetMuscle: 'Abs'
  },

  // FULL BODY
  {
    name: 'Burpees',
    muscleGroup: MuscleGroup.FULL_BODY,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Bodyweight',
    instructions: JSON.stringify([
      'Squat, jump to plank, do push-up, jump back, jump up.'
    ]),
    commonMistakes: JSON.stringify(['Poor form when tired']),
    setsRecommendation: '3',
    repsRecommendation: '10-15',
    targetMuscle: 'Full Body'
  },
  {
    name: 'Kettlebell Swings',
    muscleGroup: MuscleGroup.FULL_BODY,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Kettlebell',
    instructions: JSON.stringify([
      'Hinge and swing the bell to shoulder height using hips.'
    ]),
    commonMistakes: JSON.stringify(['Using arms to lift']),
    setsRecommendation: '3',
    repsRecommendation: '15-20',
    targetMuscle: 'Posterior Chain'
  },
  {
    name: 'Thrusters',
    muscleGroup: MuscleGroup.FULL_BODY,
    difficulty: Difficulty.INTERMEDIATE,
    equipment: 'Barbell/Dumbbells',
    instructions: JSON.stringify([
      'Front squat into an overhead press.'
    ]),
    commonMistakes: JSON.stringify(['Not using leg drive for press']),
    setsRecommendation: '3',
    repsRecommendation: '10-12',
    targetMuscle: 'Quads, Shoulders'
  },
  {
    name: 'Clean and Press',
    muscleGroup: MuscleGroup.FULL_BODY,
    difficulty: Difficulty.ADVANCED,
    equipment: 'Barbell',
    instructions: JSON.stringify([
      'Clean the bar to shoulders and press overhead.'
    ]),
    commonMistakes: JSON.stringify(['Technical errors in clean']),
    setsRecommendation: '3',
    repsRecommendation: '5-8',
    targetMuscle: 'Full Body'
  },
  {
    name: 'Mountain Climbers',
    muscleGroup: MuscleGroup.FULL_BODY,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Bodyweight',
    instructions: JSON.stringify([
      'In plank, alternate driving knees to chest.'
    ]),
    commonMistakes: JSON.stringify(['Hips too high']),
    setsRecommendation: '3',
    repsRecommendation: '30-60 seconds',
    targetMuscle: 'Full Body, Core'
  },
  {
    name: 'Farmer Walks',
    muscleGroup: MuscleGroup.FULL_BODY,
    difficulty: Difficulty.BEGINNER,
    equipment: 'Dumbbells/Kettlebells',
    instructions: JSON.stringify([
      'Walk while holding heavy weights at your sides.'
    ]),
    commonMistakes: JSON.stringify(['Slumping shoulders']),
    setsRecommendation: '3',
    repsRecommendation: '30-60 seconds',
    targetMuscle: 'Grip, Core, Legs'
  }
];

async function main() {
  console.log('Start seeding...');
  for (const ex of exercises) {
    await prisma.exercise.create({
      data: ex,
    });
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
