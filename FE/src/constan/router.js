export function params(route) {
    return {
        'location': route.params?.location ?? 'da-nang',
        'tagItem': route.params?.tagItem ?? 'do-an',
        'id': route.params?.id ?? '',
    }
}
