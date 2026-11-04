# Contributing to Flashcard Vault

Thank you for contributing to Codebreakers!

---

## Contribution Rules

1. Claim First: Comment on an open issue and wait for assignment before starting your work.
2. Branching: Create a descriptive branch (e.g. git switch -c add-storage-reset). Never commit directly to main.
3. Keep It Vanilla: Do not install packages, frameworks, or dependencies.
4. Automated/bot submissions will be closed without review.

---

## How to Add Default Starter Cards

If your contribution adds starter flashcards:
1. Open js/data.js.
2. Add your card to defaultCards following this structure:
   {
     id: 5,
     topic: "Topic Name",
     question: "Your question here?",
     answer: "Clear, concise definition or answer."
   }
3. Test locally in your browser. (Note: Clear your browser's localStorage or open in an Incognito window to view updated default cards).