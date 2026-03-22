import { defineStore } from 'pinia'
import skillsData from '../../skills.json'

function generateSkillPaths(skillName, skillConfig, path = []) {
  const paths = []

  function buildVariantPaths(index, currentPath) {
    if (index >= skillConfig.variants.length) {
      return [currentPath]
    }

    const paths = []
    const options = skillConfig.variants[index]
    for (let i = 0; i < options.length; i++) {
      paths.push(...buildVariantPaths(index + 1, [...currentPath, options[i]]))
    }
    return paths
  }

  const allVariantPaths = buildVariantPaths(0, [])

  skillConfig.types.forEach(type => {
    if (typeof type === 'string') {
      allVariantPaths.forEach(variantPath => {
        paths.push({
          skill: skillName,
          variants: variantPath,
          type: type,
          options: null
        })
      })
    } else if (type.variants) {
      function buildTypeVariantPaths(index, currentPath) {
        if (index >= type.variants.length) {
          return [currentPath]
        }

        const paths = []
        const options = type.variants[index]
        for (let i = 0; i < options.length; i++) {
          paths.push(...buildTypeVariantPaths(index + 1, [...currentPath, options[i]]))
        }
        return paths
      }

      const allTypeVariantPaths = buildTypeVariantPaths(0, [])

      allVariantPaths.forEach(variantPath => {
        allTypeVariantPaths.forEach(typeVariantPath => {
          paths.push({
            skill: skillName,
            variants: variantPath,
            type: type.name,
            options: typeVariantPath
          })
        })
      })
    }
  })

  return paths
}

export function getAllSkillPaths() {
  const allPaths = []

  Object.entries(skillsData).forEach(([skillName, skillConfig]) => {
    allPaths.push(...generateSkillPaths(skillName, skillConfig))
  })

  return allPaths
}

function getTypeName(type) {
  if (typeof type === 'string') {
    return type
  }
  return type?.name || String(type)
}

function createSkillKey(path) {
  const typeName = getTypeName(path.type)
  const parts = [path.skill, ...path.variants, typeName]
  if (path.options) {
    parts.push(...path.options)
  }
  return parts.join('|')
}

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    progress: {},
    selectedPath: null
  }),

  getters: {
    skills: () => Object.keys(skillsData),

    getSkillConfig: (state) => (skillName) => {
      return skillsData[skillName]
    },

    getVariants: (state) => (skillConfig) => {
      return skillConfig?.variants || []
    },

    getTypes: (state) => (skillConfig) => {
      return skillConfig?.types || []
    },

    getOptions: (state) => (type) => {
      if (typeof type === 'string') {
        return null
      }
      return type.variants || null
    },
    
    getTypeDisplayName: (state) => (type) => {
      if (typeof type === 'string') {
        return type
      }
      return type.displayedName || type.name
    },

    getTypeName: (state) => (type) => {
      if (typeof type === 'string') {
        return type
      }
      return type.name || String(type)
    },
    
    getRating: (state) => (path) => {
      const key = createSkillKey(path)
      return state.progress[key] || 0
    },

    selectedRating: (state) => {
      if (!state.selectedPath) return 0
      const key = createSkillKey(state.selectedPath)
      return state.progress[key] || 0
    },

    allPaths: () => {
      return getAllSkillPaths()
    },

    progressSummary: (state) => {
      const summary = {
        total: 0,
        neverAttempted: 0,
        attempted: 0,
        consistent: 0,
        clean: 0,
        inSequence: 0,
        mastered: 0
      }

      Object.values(state.progress).forEach(rating => {
        summary.total++
        switch (rating) {
          case 0: summary.neverAttempted++; break;
          case 1: summary.attempted++; break;
          case 2: summary.consistent++; break;
          case 3: summary.clean++; break;
          case 4: summary.inSequence++; break;
          case 5: summary.mastered++; break;
        }
      })

      return summary
    }
  },

  actions: {
    setProgress(path, rating) {
      const key = createSkillKey(path)
      this.progress[key] = rating
    },

    setSelectedPath(path) {
      this.selectedPath = path
    },

    clearProgress() {
      this.progress = {}
    },

    resetSelectedPath() {
      this.selectedPath = null
    }
  },

  persist: {
    key: 'figure-skating-skills',
    storage: localStorage
  }
})
