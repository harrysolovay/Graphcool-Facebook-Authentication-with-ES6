# Graphcool-Facebook-Authentication-with-ES6
Compilation of Graphcool resolvers (written with ES6 and async/await) - minimal Facebook authentication flow (no error handling)

Open the root directory in your terminal and run "gulp" – this will make sure that any changes in server/src will be recognized and acted upon (JavaScript will be transpiled into build, and other files will be duplicated into build).

To use the Graphcool CLI, CD into server – I had to break this up into to packages:
  1) the gulp environment (Graphcool-Facebook-Authentication-with-ES6-master)
  2) Graphcool server (Graphcool-Facebook-Authentication-with-ES6-master/server)

I had to do this because Graphcool uploads the entire node_modules folder upon every deployment, which takes very long and can seriously impact development time. By having a separate package for gulp and ES6-transpiling processes, I made sure that Graphcool server-specific code is all that gets uploaded (uploads only the transpiled code and, in this case, a single module, "graphcool-lib").

Please let me know if you have any questions. I hope this setup works for you as well as it did for me.
