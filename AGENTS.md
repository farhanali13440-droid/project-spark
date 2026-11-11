<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The sale page reads its registration price from the shared payment configuration so checkout and promotional offers stay consistent.
- Keep webinar schedule and countdown calculations in a shared timezone-explicit configuration; initialize the ticking clock after hydration to avoid server/client mismatches.
- Admin registration reads, reviews and private screenshots use the authenticated browser client with database-enforced admin policies; profile data is self-scoped and never grants roles.
