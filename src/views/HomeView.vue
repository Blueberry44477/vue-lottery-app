<template>
  <div class="space-y-8">
    <!-- Hero Banner -->
    <div
      class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl text-white p-8 sm:p-10 shadow-lg relative overflow-hidden"
    >
      <div class="relative z-10 max-w-2xl">
        <span
          class="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
        >
          Лабораторна робота №5
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Керування маршрутами з використанням Vue Router
        </h1>
        <p class="text-blue-100 text-base sm:text-lg mb-6 leading-relaxed">
          Сучасний SPA-застосунок на Vue 3 з використанням Vue Router 4, Pinia, VeeValidate, патерну
          Repository для взаємодії з DummyJSON REST API та авторизацією на основі JWT.
        </p>
        <div class="flex flex-wrap gap-3">
          <RouterLink
            to="/users"
            class="btn bg-white text-blue-600 font-semibold hover:bg-blue-50 shadow-md"
          >
            Перейти до користувачів &rarr;
          </RouterLink>
          <a
            href="https://github.com/Blueberry44477/vue-lottery-app"
            target="_blank"
            rel="noopener noreferrer"
            class="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-xs"
          >
            <svg class="w-4 h-4 mr-2 inline-block fill-current" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub репозиторій
          </a>
        </div>
      </div>
    </div>

    <!-- Tech Stack Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="bg-white rounded-xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-shadow"
      >
        <div
          class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4"
        >
          V
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">Vue 3 + Composition API</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          Сучасний реактивний фреймворк з використанням <code>&lt;script setup lang="ts"&gt;</code>,
          типізованих пропсів та кастомних хуків.
        </p>
      </div>

      <div
        class="bg-white rounded-xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-shadow"
      >
        <div
          class="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4"
        >
          R
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">Vue Router 4</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          Маршрутизація з динамічними параметрами (<code>/users/:id</code>), вкладеними маршрутами
          (<code>/users/:id/edit</code>), навігаційними гвардами (<code>requiresAuth</code>) та
          синхронізацією query-параметрів.
        </p>
      </div>

      <div
        class="bg-white rounded-xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-shadow"
      >
        <div
          class="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4"
        >
          P
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">Pinia Store</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          Централізований менеджмент стану: збереження стану авторизації (JWT), профілю користувача
          та кешування/мутацій списку користувачів.
        </p>
      </div>

      <div
        class="bg-white rounded-xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-shadow"
      >
        <div
          class="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg mb-4"
        >
          &infin;
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">Repository Pattern</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          Абстракція доступу до даних через узагальнені інтерфейси <code>Readable</code>,
          <code>Creatable</code>, <code>Editable</code>, <code>Deletable</code> та фабрику
          <code>ServiceProvider</code>.
        </p>
      </div>

      <div
        class="bg-white rounded-xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-shadow"
      >
        <div
          class="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg mb-4"
        >
          J
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">JWT Authentication</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          Безпечна авторизація з accessToken та refreshToken, автоматичним оновленням токенів при
          отриманні коду 401 через інтерцептор.
        </p>
      </div>

      <div
        class="bg-white rounded-xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-shadow"
      >
        <div
          class="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-lg mb-4"
        >
          &check;
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">VeeValidate & Yup</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          Надійна клієнтська валідація форм реєстрації, логіну та редагування з динамічним
          відображенням помилок.
        </p>
      </div>
    </div>

    <!-- Quick Lottery Demo Card -->
    <div class="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-xs">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100"
      >
        <div>
          <h2 class="text-xl font-bold text-gray-900">Lottery System Overview</h2>
          <p class="text-gray-500 text-sm mt-1">
            Користувачі з системи DummyJSON беруть участь у випадковому розіграші призів.
          </p>
        </div>
        <RouterLink to="/users" class="btn btn-primary btn-sm">
          Управління учасниками &rarr;
        </RouterLink>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div class="text-2xl font-bold text-blue-600">DummyJSON</div>
          <div class="text-xs text-gray-500 mt-1">Зовнішнє REST API</div>
        </div>
        <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div class="text-2xl font-bold text-indigo-600">Bearer JWT</div>
          <div class="text-xs text-gray-500 mt-1">Захищені маршрути</div>
        </div>
        <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div class="text-2xl font-bold text-emerald-600">Vue Router 4</div>
          <div class="text-xs text-gray-500 mt-1">SPA Маршрутизація</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
