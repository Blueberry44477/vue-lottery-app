<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Profile Card -->
    <div class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div
          class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-blue-500/20 shrink-0"
        >
          BL
        </div>

        <div class="text-center sm:text-left flex-1">
          <div
            class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2"
          >
            Автор лабораторної роботи
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Vitalii Skubach</h1>

          <div class="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
            <a
              href="https://github.com/Blueberry44477"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline btn-sm inline-flex items-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              GitHub Профіль
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical Skills Block -->
    <div class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs">
      <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        Technical Skills
      </h2>

      <div class="space-y-6">
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Frontend Frameworks & Core
          </h3>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-primary text-xs py-1 px-3">Vue.js 3</span>
            <span class="badge badge-primary text-xs py-1 px-3">Composition API</span>
            <span class="badge badge-primary text-xs py-1 px-3">TypeScript</span>
            <span class="badge badge-primary text-xs py-1 px-3">JavaScript (ES6+)</span>
            <span class="badge badge-primary text-xs py-1 px-3">HTML5 / Web APIs</span>
          </div>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Routing & State Management
          </h3>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-success text-xs py-1 px-3">Vue Router 4</span>
            <span class="badge badge-success text-xs py-1 px-3">Dynamic Routes & Params</span>
            <span class="badge badge-success text-xs py-1 px-3">Nested Routes</span>
            <span class="badge badge-success text-xs py-1 px-3">Navigation Guards</span>
            <span class="badge badge-success text-xs py-1 px-3">Pinia Store</span>
          </div>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Styling & UI Design
          </h3>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-warning text-xs py-1 px-3">SCSS / SASS</span>
            <span class="badge badge-warning text-xs py-1 px-3">Tailwind CSS 4</span>
            <span class="badge badge-warning text-xs py-1 px-3">Responsive Design</span>
            <span class="badge badge-warning text-xs py-1 px-3">Component Layouts</span>
          </div>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Architecture, Security & Validation
          </h3>
          <div class="flex flex-wrap gap-2">
            <span class="badge bg-purple-50 text-purple-700 text-xs py-1 px-3"
              >Repository Pattern</span
            >
            <span class="badge bg-purple-50 text-purple-700 text-xs py-1 px-3"
              >JWT Authentication (Access & Refresh)</span
            >
            <span class="badge bg-purple-50 text-purple-700 text-xs py-1 px-3"
              >HTTP 401 Interceptors</span
            >
            <span class="badge bg-purple-50 text-purple-700 text-xs py-1 px-3"
              >VeeValidate + Yup</span
            >
            <span class="badge bg-purple-50 text-purple-700 text-xs py-1 px-3"
              >REST API (DummyJSON)</span
            >
          </div>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Tooling, Quality & CI/CD
          </h3>
          <div class="flex flex-wrap gap-2">
            <span class="badge bg-slate-100 text-slate-700 text-xs py-1 px-3">Vite</span>
            <span class="badge bg-slate-100 text-slate-700 text-xs py-1 px-3"
              >Vitest & Vue Test Utils</span
            >
            <span class="badge bg-slate-100 text-slate-700 text-xs py-1 px-3">ESLint & Oxlint</span>
            <span class="badge bg-slate-100 text-slate-700 text-xs py-1 px-3">Prettier</span>
            <span class="badge bg-slate-100 text-slate-700 text-xs py-1 px-3"
              >Git & GitHub Pages</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About author view
</script>
