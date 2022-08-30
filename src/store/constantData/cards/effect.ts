interface effect {
    damage: number; //Dégats infligés à la cible
    selfDamage: number; //Dégats infligés à soi-même
    damageAOE: boolean; //Dégatas infligés à tous les ennemis et pas juste la cible
    ignoreBlock: boolean; //Dégats ignorent l'armure ennemie
    block: number; //Armure gagnée
    energy: number; //Énergie gagnée
    draw: number; //Nombre de cartes piochées
    buffSelfAttack: number; //Buff à l'attaque (peut être négatif pour faire débuff)
    buffSelfDefense: number; //Buff à la défense (peut être négatif pour faire débuff)
    debuffAttack: number; //Débuff à l'attaque appliqué à la cible
    debuffDefense: number; //Débuff à la défense appliqué à la cible
    selfHeal: number; //Soin en pourcentage des pv total
}