import MODAL from "@/constan/modal";

export const showModal = function (target) {
    const tagModal = target?.attributes['modal']?.nodeValue
    if (tagModal && tagModal === MODAL.search) {
        const modal = document.getElementById(`${tagModal}`)
        if (modal)
            modal.style.display = 'block'
    }
}

export const turnOffModal = function (tagModal) {
    const modal = document.getElementById(`${tagModal}`)

    if (modal)
        modal.style.display = 'none'
}