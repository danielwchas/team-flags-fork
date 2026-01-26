'use client';

import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface ConfigStatusProps {
  firebaseConfigured: boolean;
  mongoConfigured: boolean;
}

export default function ConfigStatus({ firebaseConfigured, mongoConfigured }: ConfigStatusProps) {
  const allConfigured = firebaseConfigured && mongoConfigured;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Docker Container Running! 🐳
          </h1>
          <p className="text-slate-300">
            Your application is successfully running in Docker
          </p>
        </div>

        {/* Configuration Status */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white">Next.js Application</h3>
              <p className="text-sm text-slate-300">Running successfully on port 3000</p>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-4 rounded-lg ${
            firebaseConfigured
              ? 'bg-slate-700/50'
              : 'bg-yellow-500/10 border border-yellow-500/30'
          }`}>
            {firebaseConfigured ? (
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-semibold text-white">Firebase Authentication</h3>
              <p className="text-sm text-slate-300">
                {firebaseConfigured
                  ? 'Configured and ready'
                  : 'Not configured - Add NEXT_PUBLIC_FIREBASE_* variables to .env.local'
                }
              </p>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-4 rounded-lg ${
            mongoConfigured
              ? 'bg-slate-700/50'
              : 'bg-yellow-500/10 border border-yellow-500/30'
          }`}>
            {mongoConfigured ? (
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-semibold text-white">MongoDB Database</h3>
              <p className="text-sm text-slate-300">
                {mongoConfigured
                  ? 'Connected successfully'
                  : 'Not configured - Add MONGODB_URI to .env.local'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Info Box for Week 2 */}
        {!allConfigured && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-300 mb-1">Week 2: Docker Focus</h4>
                <p className="text-sm text-blue-200">
                  This is expected for Week 2! You're learning Docker concepts, not database configuration.
                  The fact that you see this page means Docker is working correctly. 🎉
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="font-semibold text-white mb-3">What You've Accomplished:</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Built Docker image using multi-stage Dockerfile</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Container is running with proper port mapping</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Next.js application serving successfully</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Environment variables system is working</span>
            </li>
          </ul>
        </div>

        {/* ASCII Architecture Diagram */}
        <div className="mt-6 border-t border-slate-700 pt-6">
          <h3 className="font-semibold text-white mb-3">Your Docker Journey:</h3>
          <pre className="bg-slate-900/50 p-4 rounded-lg text-xs text-green-400 font-mono overflow-x-auto leading-relaxed">
{`┌──────────────────────────────────────────────────────────────┐
│           Multi-Stage Docker Build Process                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [STAGE 1] deps (Dependencies)                   [✓] DONE   │
│  ┌────────────────────────────────────────────┐             │
│  │  FROM node:20-alpine                       │             │
│  │  COPY package*.json                        │             │
│  │  RUN npm ci                                │             │
│  │  --> Result: 1.06GB image with deps        │             │
│  └────────────────────────────────────────────┘             │
│            │                                                 │
│            ├── Layer caching: [✓] Working!                  │
│            └── Security: [✓] Alpine Linux                   │
│                                                              │
│  [STAGE 2] builder (Build)                   [...] BLOCKED  │
│  ┌────────────────────────────────────────────┐             │
│  │  COPY source code                          │             │
│  │  RUN npm run build                         │             │
│  │  --> Needs: Firebase credentials           │             │
│  └────────────────────────────────────────────┘             │
│            │                                                 │
│            └── Coming: Week 3                               │
│                                                              │
│  [STAGE 3] runner (Production)               [ ] FUTURE     │
│  ┌────────────────────────────────────────────┐             │
│  │  Non-root user (security)                  │             │
│  │  Standalone Next.js build                  │             │
│  │  CMD ["node", "server.js"]                 │             │
│  └────────────────────────────────────────────┘             │
│            │                                                 │
│            └── Coming: Week 4                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘

[SUCCESS] Week 2 Achievement Unlocked:
   [✓] Multi-stage Dockerfile understanding
   [✓] Docker build --target deps
   [✓] Image size optimization concepts
   [✓] Layer caching demonstration
   [✓] Container exploration (docker run)
`}
          </pre>
        </div>

        {/* Coming Next */}
        {!allConfigured && (
          <div className="mt-6 border-t border-slate-700 pt-6">
            <h3 className="font-semibold text-white mb-3">Coming in Future Weeks:</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-slate-500">→</span>
                <span>Week 3: Firebase Authentication setup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-500">→</span>
                <span>Week 3: MongoDB database connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-500">→</span>
                <span>Week 4: Docker Compose for multi-container apps</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
