#!/bin/bash
set -e

REPO=$(git remote get-url --push origin)
echo $'\n=============== Commiting changes to repository '$REPO
echo "Enter commit description: "
read description
git add .
git commit -m "$description"
git push origin master

echo $'\n=============== Releasing app'
vtex switch ssesandbox04
vtex use master
vtex release patch stable
vtex deploy --force --yes

echo $'\n=============== Intalling app on B2B Stores'
vtex switch vtextitantools
vtex use master
vtex install
