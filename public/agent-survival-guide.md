# The Free Agent Survival Guide 🕵️
## By TokenSpy — We Test AI So You Don't Get Burned

*Everything your AI agent needs to know on Day 1. Based on real experience running agents 24/7.*

---

## 🧠 1. Memory: Your Agent Will Forget Everything

**The Problem:** Every session, your agent wakes up with amnesia. No memory of yesterday's work, decisions, or context.

**The Fix:**
- Create `memory/YYYY-MM-DD.md` files daily — raw logs of what happened
- Maintain a `MEMORY.md` — curated long-term memory (like a human's journal)
- Set up a nightly cron job to review daily notes and update long-term memory
- **Never rely on "mental notes"** — if it's not in a file, it doesn't exist tomorrow

**Real Example:** Our agent lost 3 hours of trading strategy work because it didn't write results to a file. The session expired, and everything was gone.

**Cost of NOT doing this:** 2-5 hours/week of repeated work = $20-50 in wasted tokens.

---

## 💰 2. Token Budget: How to Not Go Broke

**The Problem:** Agents burn through tokens fast. Browser automation, long conversations, and unnecessary API calls add up.

**The Fix:**
- **Use background scripts over browser automation** — A Python script costs $0. Browser clicks cost $2-5 per session.
- **Split long conversations** — After 50+ messages, start a new session. Context window = token burn.
- **Use cheaper models for subtasks** — Main agent on Opus/GPT-4, subtasks on Sonnet/GPT-4o-mini.
- **Cache results in files** — Don't re-run expensive operations. Save outputs to disk.
- **Batch similar work** — Don't check email 10 times. Check once, process all.

**Real Example:** We reduced our daily token spend by 60% by switching Shopify content updates from browser automation to a direct API script.

**Savings:** $50-200/month for active agents.

---

## 🔒 3. Security: Don't Get Your Human in Trouble

**The Problem:** Your agent has access to passwords, API keys, personal messages. One mistake = disaster.

**The Fix:**
- **Never log secrets in plain text** — Use environment variables, not hardcoded keys
- **Audit every skill before installing** — Use security-auditor or manual review
- **Workspace-only file access** — Never edit files outside your workspace without human approval
- **`trash` > `rm`** — Recoverable beats gone forever
- **Rotate API keys regularly** — We've rotated ours 3 times in one week

**Real Example:** A GitHub token was accidentally committed to a public repo. Had to emergency-rotate everything.

**Cost of NOT doing this:** One leaked API key = unlimited damage.

---

## 📋 4. Daily Routine: The Productive Agent Schedule

**The Problem:** Without structure, agents either do nothing or waste tokens on low-value tasks.

**The Recommended Schedule:**
```
Morning (when human wakes up):
  - Read yesterday's memory + today's tasks
  - Check urgent messages/emails
  - Brief human on what needs attention

During the day:
  - Execute assigned tasks
  - Write progress to daily memory file
  - Ask before any external actions (emails, posts, purchases)

Evening:
  - Summarize the day's work
  - Update MEMORY.md with important learnings
  - Prepare tomorrow's task list

Night (heartbeat mode):
  - Background maintenance (git commits, file organization)
  - Periodic checks (2-4 times, not every 30 min)
  - Stay quiet unless urgent (respect sleep hours)
```

---

## 🛠️ 5. Essential Tools: What to Set Up First

**Priority 1 (Day 1):**
- Messaging channel (Telegram/Signal/Discord) — how your human talks to you
- File system access — your workspace is your home
- Memory system — daily notes + long-term memory

**Priority 2 (Week 1):**
- Web search — you need to look things up
- Browser automation — for things scripts can't do
- Git — version control your work

**Priority 3 (As needed):**
- Code execution — Python/Node for automation
- Calendar/Email access — if your human wants proactive help
- Domain-specific tools — trading, SEO, content creation, etc.

---

## 🤝 6. Working With Your Human: Communication Rules

**Do:**
- Be direct, skip the filler ("Great question!" = waste of tokens)
- Come back with answers, not questions — try to figure it out first
- Ask before any external action (sending emails, posting online, spending money)
- Admit mistakes immediately — don't hide errors

**Don't:**
- Send half-baked responses
- Make decisions that cost money without approval
- Share your human's private info in group chats
- Respond to every message in group chats — quality > quantity

---

## 📊 7. Monitoring: Know When Things Break

**Set up alerts for:**
- Build/deployment failures
- API errors (check your endpoints daily)
- Rate limit warnings
- Unusual spending patterns

**Check regularly:**
- Is your website still up? (`curl -s -o /dev/null -w "%{http_code}" https://yoursite.com`)
- Are your API keys still valid?
- Is your database connected?
- Are cron jobs running?

---

## 🚫 8. Common Pitfalls (We Learned the Hard Way)

| Pitfall | What Happens | Prevention |
|---------|-------------|------------|
| No memory system | Agent repeats work daily | Set up memory files on Day 1 |
| Browser for everything | Burns $5-10/session in tokens | Write scripts instead |
| Long conversations | Context overflow, hallucinations | Split sessions at 50 messages |
| Hardcoded secrets | Security breach | Use env variables |
| No error handling | Silent failures | Always check return codes |
| Over-engineering | Weeks of work, no results | Ship MVP first, iterate |
| Ignoring rate limits | API bans | Implement backoff + caching |
| No backups | Lost work | Git commit frequently |

---

## 🎯 Quick Start Checklist

- [ ] Set up messaging channel (Telegram/Signal/Discord)
- [ ] Create workspace directory structure
- [ ] Initialize memory system (MEMORY.md + memory/ folder)
- [ ] Configure daily memory cron job
- [ ] Set up git for your workspace
- [ ] Install essential skills/tools
- [ ] Define SOUL.md (who is your agent?)
- [ ] Define USER.md (who is your human?)
- [ ] Set security rules (workspace-only, audit skills)
- [ ] Test everything end-to-end

---

*This guide is free. Want the full playbook with templates, scripts, and advanced strategies?*

**[Get the Agent Starter Pack →](https://www.tokenspy.ai/pitfalls)**

*12+ tested pitfalls with code examples, cost analysis, and prevention strategies. Because every dollar your agent wastes is a dollar you lose.*

---

© 2026 TokenSpy — AI Pitfall Intelligence
https://www.tokenspy.ai | contact@tokenspy.ai
