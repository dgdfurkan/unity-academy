import type { Dictionary } from "./tr";

export const en: Dictionary = {
  meta: {
    title: "Unity Academy",
    description:
      "C#, Unity, and the production patterns behind mobile games. Watch it, write it, run it, check it.",
  },
  nav: {
    home: "Home",
    how: "How it works",
    build: "What you build",
    curriculum: "Curriculum",
    signIn: "Sign in",
    start: "Start",
    skipToContent: "Skip to content",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    language: "Language",
    switchLanguage: "Switch to Turkish",
  },
  hero: {
    badge: "Module by module, from zero to shipped",
    titleTop: "Learn Unity properly.",
    titleAccent: "Ship what you build.",
    body:
      "C#, Unity's lifecycle, physics, and the production patterns behind mobile games. Every idea is explained, then you write it in the browser and it gets checked.",
    ctaPrimary: "Start now",
    ctaSecondary: "See the curriculum",
  },
  check: {
    passed: "Passed.",
    body: "Movement runs in FixedUpdate and scales with fixedDeltaTime, so it holds up at any frame rate.",
  },
  how: {
    title: "How it works",
    lead: "Three things happen in every lesson.",
    items: [
      {
        title: "See the idea",
        body: "Each lesson takes one idea end to end. You see the decision being made, not just the finished file.",
      },
      {
        title: "Write the code here",
        body: "Then you write the same code in the browser and check it. The result tells you what ran and why the rest broke.",
      },
      {
        title: "It comes back",
        body: "Ideas from the first module resurface in the fifth. Sized to what you have forgotten, not to a fixed schedule.",
      },
    ],
  },
  build: {
    title: "What you build",
    lead: "Three complete projects, each picked for what it forces you to learn.",
    items: [
      {
        title: "Endless runner",
        body: "Input, character control, procedural ground, object pooling, and a difficulty curve that survives past the first minute.",
      },
      {
        title: "Idle game",
        body: "Offline progression, big-number math, save and load, and an upgrade loop that stays readable as it grows.",
      },
      {
        title: "Playable ad",
        body: "A build small enough to ship as an ad: tight scope, fast load, one clear hook, and the limits the networks impose.",
      },
    ],
  },
  curriculum: {
    title: "Curriculum",
    lead: "Eight modules. The order matters more than the pace.",
    items: [
      {
        title: "C# that sticks",
        body: "Types, access modifiers, and SerializeField, taught by showing what each one changes in the Inspector.",
      },
      {
        title: "The lifecycle",
        body: "Awake, OnEnable, Start, Update, FixedUpdate, LateUpdate. What each is for and what breaks when you pick wrong.",
      },
      {
        title: "Scene and components",
        body: "GameObject, Prefab, the Transform hierarchy, and building a scene you can still edit a month later.",
      },
      {
        title: "Physics",
        body: "Rigidbody, Collider, triggers, Raycast, and layer masks, alongside the failure modes you will actually hit.",
      },
      {
        title: "Production patterns",
        body: "SOLID applied to gameplay code, ScriptableObject, event systems, and keeping systems from tangling together.",
      },
      {
        title: "Performance on phones",
        body: "What never goes inside Update, pooling, allocation, draw calls, and reading a profile instead of guessing.",
      },
      {
        title: "Third-party tooling",
        body: "Adding packages such as DOTween, weighing what a dependency costs you, and knowing when to write it yourself.",
      },
      {
        title: "Shipping",
        body: "Build settings, mobile targets, and how ads and analytics fit in without taking the game over.",
      },
    ],
  },
  cta: {
    title: "Ready when you are",
    body: "Create your account and the first module is waiting.",
    button: "Create account",
  },
  footer: {
    trademark: "Unity and C# are trademarks of their respective owners.",
  },
};
