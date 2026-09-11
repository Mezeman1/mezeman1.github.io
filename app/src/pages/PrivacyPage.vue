<script setup lang="ts">
import { useRouter } from 'vue-router'
import TerminalPrompt from '../components/TerminalPrompt.vue'

const router = useRouter()

type Line = { prompt: boolean; text: string }

const commands: Record<string, () => Line[]> = {
  help: () => [
    { prompt: false, text: 'available commands:' },
    { prompt: false, text: '  cd /       — go home' },
    { prompt: false, text: '  cd games   — go to games' },
    { prompt: false, text: '  clear      — clear terminal' },
  ],
  'cd /': () => { router.push('/'); return [] },
  'cd ~': () => { router.push('/'); return [] },
  'cd home': () => { router.push('/'); return [] },
  'cd games': () => { router.push('/games'); return [] },
  'cd games/': () => { router.push('/games'); return [] },
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center gap-2 text-sm">
      <span class="text-terminal-dimgreen">$</span>
      <span class="text-terminal-white">cat privacy-policy.txt</span>
    </div>

    <div class="border border-terminal-border bg-terminal-surface p-6 space-y-5 text-sm leading-relaxed">
      <div class="text-terminal-muted text-xs border-b border-terminal-border pb-3">
        last-updated: 2026-09-11 // author: mezeman1
      </div>

      <p class="text-terminal-muted">
        This policy covers every game published by mezeman1: <span class="text-terminal-dimgreen">Endless
        Bastion</span> on Google Play and on the web, and the browser games listed under
        <RouterLink to="/games" class="text-terminal-green hover:underline">~/games</RouterLink>.
        Each game collects different things, so every section below says which game it applies to.
      </p>

      <section>
        <h2 class="text-terminal-green mb-2">// endless bastion — android (google play)</h2>
        <ul class="text-terminal-muted space-y-2 list-none">
          <li>
            <span class="text-terminal-dimgreen">game_progress:</span>
            Your save — waves reached, upgrades, research, currencies — is written to the app's own
            storage on your device. It is not uploaded to us, and Android deletes it when you
            uninstall the app.
          </li>
          <li>
            <span class="text-terminal-dimgreen">play_games:</span>
            The game offers sign-in through Google Play Games Services. Sign-in is optional and can
            be declined; the game is fully playable without it. Google tells the game whether a
            player is signed in and gives it your Play Games player ID. We never receive your email
            address, your password, or your contacts.
          </li>
          <li>
            <span class="text-terminal-dimgreen">analytics:</span>
            The Android build includes Google Analytics for Firebase, which automatically reports app
            usage to Google: an app instance ID, device model, operating system and app version,
            coarse country or region, crash and session events, and the Android advertising ID. It is
            used to see which parts of the game people play and where the game breaks.
          </li>
          <li>
            <span class="text-terminal-dimgreen">not_collected:</span>
            No ads, no purchases, no accounts created by us, no location, no contacts, no camera,
            no microphone, no files, no messages.
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// endless bastion — web build</h2>
        <p class="text-terminal-muted">
          The browser version stores your save in your browser's own local storage on your machine,
          and includes no analytics and no sign-in. It is served by GitHub Pages, which logs requests
          — including your IP address — under
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            class="text-terminal-green hover:underline"
            target="_blank"
            rel="noopener"
          >GitHub's own privacy statement</a>.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// browser idle games</h2>
        <p class="text-terminal-muted">
          The browser idle games on this site — Idle Ant Farm, Idle Packs, Idle Complaints and Idle
          Grid Factory — offer sign-in through Firebase Authentication, so your progress follows you
          between devices. Signing in collects your email address, and your save is stored in
          Firebase under it. Without signing in, those games keep progress only in your browser.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// who else sees it</h2>
        <p class="text-terminal-muted">
          We do not sell your data and we do not share it with advertisers. The services above are
          run by Google (Firebase, Google Play, Play Games Services) and process this data on our
          behalf under
          <a
            href="https://policies.google.com/privacy"
            class="text-terminal-green hover:underline"
            target="_blank"
            rel="noopener"
          >Google's privacy policy</a>. We disclose data otherwise only where the law requires it.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// keeping and deleting it</h2>
        <ul class="text-terminal-muted space-y-2 list-none">
          <li>
            <span class="text-terminal-dimgreen">device_save:</span>
            Erase it yourself at any time — <em>Settings → Reset all progress</em> inside the game,
            or uninstall the app.
          </li>
          <li>
            <span class="text-terminal-dimgreen">play_games:</span>
            Remove the game's access and its Play Games data from your Google account at
            <a
              href="https://myaccount.google.com/permissions"
              class="text-terminal-green hover:underline"
              target="_blank"
              rel="noopener"
            >myaccount.google.com/permissions</a>.
          </li>
          <li>
            <span class="text-terminal-dimgreen">analytics:</span>
            Held by Google under Firebase's retention settings. Resetting or deleting your
            advertising ID in Android settings breaks the link to your device.
          </li>
          <li>
            <span class="text-terminal-dimgreen">account_data:</span>
            Email us to have the account and saved data for the browser games deleted. Deletion
            requests are answered within 30 days.
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// your rights</h2>
        <p class="text-terminal-muted">
          Under the GDPR and similar laws you can ask for a copy of the data held about you, ask for
          it to be corrected or deleted, or object to its processing. Analytics is processed on the
          basis of our legitimate interest in seeing how the game performs; account data is processed
          to provide the service you signed in for. One email is enough for any of these.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// children's privacy</h2>
        <p class="text-terminal-muted">
          These games are not directed at children under 13, and we do not knowingly collect data
          from them. If you believe a child's data reached us, email us and it will be removed.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// changes</h2>
        <p class="text-terminal-muted">
          When a game starts or stops collecting something, this page changes with it and the date at
          the top moves. The date above is the version in force.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// contact</h2>
        <p class="text-terminal-muted">
          Questions, or a request about your data? Reach out at
          <a href="mailto:mezeman1@gmail.com" class="text-terminal-green hover:underline">mezeman1@gmail.com</a>.
        </p>
      </section>

      <div class="text-xs text-terminal-muted border-t border-terminal-border pt-3">
        EOF
      </div>
    </div>

    <TerminalPrompt :commands="commands" />
  </div>
</template>
