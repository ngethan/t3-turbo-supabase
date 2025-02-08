cd packages/ui
for file in src/*.tsx; 
    do pnpx shadcn-ui@latest add -y -o $(basename "$file" .tsx);
done
pnpx prettier src --write --list-different