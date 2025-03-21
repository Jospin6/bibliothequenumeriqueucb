export const formatDate = (date: string) => {
    const options = { year: "numeric" as "numeric", month: "long" as "long", day: "numeric" as "numeric" };
    return new Date(date).toLocaleDateString('fr-FR', options);
}