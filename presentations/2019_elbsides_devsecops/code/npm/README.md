# Showcase for npm Audit

## Usage

```
npm i
```

Shows that there are vulnerabilities:

```
npm WARN vulnerable-app@1.0.0 No description
npm WARN vulnerable-app@1.0.0 No repository field.

audited 1 package in 1.293s
found 1 low severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
```

Fix vulnerabilities

```
npm audit
```

```
=== npm audit security report ===

# Run  npm install moment@2.24.0  to resolve 1 vulnerability
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Low           │ Regular Expression Denial of Service                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ moment                                                       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ moment                                                       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ moment                                                       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/532                             │
└───────────────┴──────────────────────────────────────────────────────────────┘


found 1 low severity vulnerability in 1 scanned package
run `npm audit fix` to fix 1 of them.
```


```
npm audit fix
```

As alternative make exception:

```
git reset --hard
```

```
npm run test:security
npm run test:audit-resolve
```
